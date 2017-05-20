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

    let input = element.querySelector('.map-component input');

    expect(input.type).toBe('button');
    expect(input.value).toBe('Gravar');
});