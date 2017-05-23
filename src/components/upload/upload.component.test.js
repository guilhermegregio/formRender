import localStorageMock from '../../../__mocks__/localStorage';

import UploadComponent from './upload.component';

let element;

beforeEach(() => {
    element = document.createElement('div');
});

test('should create simple button', () => {
    let upload = new UploadComponent({
        "type": "upload",
        "name": "uplImage",
        "id": "uplImage",
        "class": "upload-upload"
    });

    upload.appendTo(element);

    let input = element.querySelector('.upload-component input');

    expect(input.type).toBe('file');
});