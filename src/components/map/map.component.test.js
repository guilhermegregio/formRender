import googleMock from '../../../__mocks__/google';
import localStorageMock from '../../../__mocks__/localStorage';

import MapComponent from './map.component';

let element;

beforeEach(() => {
    element = document.createElement('div');
});

test('should create simple map', () => {
    let map = new MapComponent({
        "type": "map",
        "name": "mapRenderer",
        "id": "mapRenderer",
        "class": "map-renderer"
    });

    map.appendTo(element);

    let rootElement = element.querySelector('div');

    
    expect(rootElement.className).toEqual(expect.stringContaining('map-component'));
});