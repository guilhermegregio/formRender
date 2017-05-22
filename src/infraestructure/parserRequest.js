import { TextComponent, ButtonComponent, UploadComponent, ImageComponent, MapComponent } from '../components';

export default class ParserRequest {
    constructor(request) {
        this.fields = request.fields.map(field => {
            return MapComponents.call(field);
        });
    }

    appendTo(element) {
        this.fields.forEach(field => {
            field.appendTo(element);
        });
    }
}

let MapComponents = {
    text: TextComponent,
    button: ButtonComponent,
    upload: UploadComponent,
    image: ImageComponent,
    map: MapComponent,

    call: (field) => {
        let type = field.type.match(/([a-z]+)/)[1];

        let Component = MapComponents[type];

        if (!Component) {
            Component = class {
                appendTo() { }
            };
        }

        return new Component(field);
    }
};