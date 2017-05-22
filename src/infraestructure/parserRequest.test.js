import googleMock from '../../__mocks__/google';
import localStorageMock from '../../__mocks__/localStorage';

import ParserRequest from './parserRequest';
import { TextComponent, ButtonComponent, ImageComponent, UploadComponent, MapComponent } from '../components';

let element;

const textField = {
    name: 'txtFullname',
    id: 'txtFullname',
    value: '',
    type: 'text',
    class: 'input'
};

const textAddressField = {
    name: 'txtAddress',
    id: 'txtAddress',
    value: '',
    type: 'text:address',
    class: 'input'
};

const buttonField = {
    type: 'button',
    name: 'btnSave',
    id: 'btnSave',
    value: 'Gravar',
    class: 'input'
};

const imageField = {
    type: 'image',
    name: 'imgAvatar',
    id: 'imgAvatar',
    class: 'image'
}

const uploadField = {
    type: 'upload',
    name: 'uplImage',
    id: 'uplImage',
    class: 'upload-button'
}

const mapField = {
    type: 'map',
    name: 'mapRenderer',
    id: 'mapRenderer',
    class: 'map-renderer'
};

beforeEach(() => {
    element = document.createElement('div');
});

test('should parse simple text component with request json', () => {
    let request = {
        fields: [textField]
    };

    let parsed = new ParserRequest(request);

    expect(parsed.fields[0]).toBeInstanceOf(TextComponent);
});

test('should parse simple text address component with request json', () => {
    let request = {
        fields: [textAddressField]
    };

    let parsed = new ParserRequest(request);

    expect(parsed.fields[0]).toBeInstanceOf(TextComponent);
});

test('should parse simple button component with request json', () => {
    let request = {
        fields: [buttonField]
    };

    let parsed = new ParserRequest(request);

    expect(parsed.fields[0]).toBeInstanceOf(ButtonComponent);
});

test('should parse simple image component with request json', () => {
    let request = {
        fields: [imageField]
    };

    let parsed = new ParserRequest(request);

    expect(parsed.fields[0]).toBeInstanceOf(ImageComponent);
});

test('should parse simple upload component with request json', () => {
    let request = {
        fields: [uploadField]
    };

    let parsed = new ParserRequest(request);

    expect(parsed.fields[0]).toBeInstanceOf(UploadComponent);
});

test('should parse simple map component with request json', () => {
    let request = {
        fields: [mapField]
    };

    let parsed = new ParserRequest(request);

    expect(parsed.fields[0]).toBeInstanceOf(MapComponent);
});

test('should parse multi components', () => {
    let request = {
        fields: [textField, textAddressField, uploadField, imageField, mapField, buttonField]
    };

    let parsed = new ParserRequest(request);

    expect(parsed.fields[0]).toBeInstanceOf(TextComponent);
    expect(parsed.fields[1]).toBeInstanceOf(TextComponent);
    expect(parsed.fields[2]).toBeInstanceOf(UploadComponent);
    expect(parsed.fields[3]).toBeInstanceOf(ImageComponent);
    expect(parsed.fields[4]).toBeInstanceOf(MapComponent);
    expect(parsed.fields[5]).toBeInstanceOf(ButtonComponent);
});

test('should append components to element', () => {
    let request = {
        fields: [textField, textAddressField, uploadField, imageField, mapField, buttonField]
    };

    new ParserRequest(request).appendTo(element);

    expect(element.querySelectorAll('.text-component').length).toBe(2);
    expect(element.querySelectorAll('.upload-component').length).toBe(1);
    expect(element.querySelectorAll('.image-component').length).toBe(1);
    expect(element.querySelectorAll('.map-component').length).toBe(1);
    expect(element.querySelectorAll('.button-component').length).toBe(1);
});