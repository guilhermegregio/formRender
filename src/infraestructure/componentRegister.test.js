import ComponentRegister from './componentRegister';

test('should register is a singleton', () => {
    let instance1 = ComponentRegister.getRegister();
    let instance2 = ComponentRegister.getRegister();

    expect(instance1).toBe(instance2);
});

test('should return a list of components zero', () => {
    expect(ComponentRegister.getRegister().components.length).toBe(0);
});

test('should return a list of components', () => {
    let Comp1 = class { };

    ComponentRegister.getRegister().registry(new Comp1());


    expect(ComponentRegister.getRegister().components.length).toBe(1);
});