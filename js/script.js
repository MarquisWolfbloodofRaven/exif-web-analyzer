const dropZone = document.querySelector('.drop-zone');
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');
const preview = document.getElementById('preview');
const exifDataSection = document.getElementById('exif-data');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const loadingIndicator = document.getElementById('loading');

const datetimeOriginal = document.getElementById('datetime-original');
const datetime = document.getElementById('datetime');
const datetimeDigitized = document.getElementById('datetime-digitized');
const modificationStatus = document.getElementById('modification-status');
const software = document.getElementById('software');
const allMetadata = document.getElementById('all-metadata');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, e => {
        e.preventDefault();
        e.stopPropagation();
    }, false);
});
['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.add('active'), false);
});
['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.remove('active'), false);
});
dropZone.addEventListener('drop', e => {
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFiles(files);
});
dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) handleFiles(fileInput.files);
});

function handleFiles(files) {
    const file = files[0];
    if (!['image/jpeg', 'image/tiff'].includes(file.type)) {
        showError('Formato de arquivo não suportado. Apenas JPEG e TIFF são aceitos.');
        return;
    }

    hideError();
    loadingIndicator.classList.remove('hidden');

    const reader = new FileReader();
    reader.onload = e => {
        preview.src = e.target.result;
        imagePreview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);

    EXIF.getData(file, function () {
        loadingIndicator.classList.add('hidden');
        const tags = EXIF.getAllTags(this);
        console.log('Tags EXIF:', tags);
        if (tags && Object.keys(tags).length > 0) {
            displayExifData(this);
        } else {
            showError('Nenhum metadado EXIF encontrado nesta imagem. Certifique-se de que a imagem contém metadados.');
        }
    });
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    loadingIndicator.classList.add('hidden');
    exifDataSection.classList.add('hidden');
}
function hideError() {
    errorMessage.classList.add('hidden');
}
function formatDateTime(dateTimeStr) {
    if (dateTimeStr === 'Desconhecido') return dateTimeStr;
    const parts = dateTimeStr.split(' ');
    if (parts.length !== 2) return dateTimeStr;
    return `${parts[0].replace(/:/g, '-')} ${parts[1]}`;
}
function displayExifData(img) {
    exifDataSection.classList.remove('hidden');
    const origDate = EXIF.getTag(img, 'DateTimeOriginal') || 'Desconhecido';
    const createDate = EXIF.getTag(img, 'DateTime') || 'Desconhecido';
    const modDate = EXIF.getTag(img, 'DateTimeDigitized') || 'Desconhecido';

    datetimeOriginal.textContent = formatDateTime(origDate);
    datetime.textContent = formatDateTime(createDate);
    datetimeDigitized.textContent = formatDateTime(modDate);

    if (origDate !== 'Desconhecido' && modDate !== 'Desconhecido' && origDate !== modDate) {
        modificationStatus.textContent = '⚠️ A imagem pode ter sido alterada!';
        modificationStatus.classList.add('text-yellow-600', 'dark:text-yellow-400', 'font-medium');
    } else {
        modificationStatus.textContent = '✅ As datas são coerentes, sem sinais de alteração.';
        modificationStatus.classList.add('text-green-600', 'dark:text-green-400', 'font-medium');
    }

    const softwareInfo = EXIF.getTag(img, 'Software') || 'Não encontrado';
    software.textContent = softwareInfo;

    const tags = EXIF.getAllTags(img);
    allMetadata.innerHTML = '';
    for (const [key, value] of Object.entries(tags)) {
        const row = document.createElement('tr');
        row.className = 'border-t border-gray-200 dark:border-gray-600';
        const tagCell = document.createElement('td');
        tagCell.className = 'py-2 px-4 font-medium';
        tagCell.textContent = key;

        const valueCell = document.createElement('td');
        valueCell.className = 'py-2 px-4';
        valueCell.textContent = key.includes('DateTime') ? formatDateTime(value) :
            (typeof value === 'object' ? JSON.stringify(value) : value);

        row.appendChild(tagCell);
        row.appendChild(valueCell);
        allMetadata.appendChild(row);
    }
}
