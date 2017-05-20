import localStorage from '../../../__mocks__/localStorage';

import ImageComponent from './image.component';

let element;

beforeEach(() => {
    element = document.createElement('div');
});

test('should create simple button', () => {
    let upload = new ImageComponent({
        "type": "upload",
        "name": "uplImage",
        "id": "uplImage",
        "class": "upload-upload"
    });

    upload.appendTo(element);

    let img = element.querySelector('.image-component img');

    expect(img.src).toBe("");
});