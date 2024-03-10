import 'reflect-metadata'

const metaOne = Symbol('metaOne')
const metaTwo = Symbol('metaTwo')
const metaThree = Symbol('metaThree')

function classDecorator(): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata(metaTwo, 'class 2', target)
    }
}

function staticMethodDecorator(): MethodDecorator {
    return (target: any, propertyKey: any) => {
        Reflect.defineMetadata(metaTwo, 'class method 2', target, propertyKey)
    }
}

function methodDecorator(): MethodDecorator {
    return (target: any, propertyKey: any) => {
        console.log('methodDecorator')
        Reflect.defineMetadata(metaTwo, 'instance method 2', target, propertyKey)
    }
}

function methodDecorator2(): MethodDecorator {
    return (target: any, propertyKey: any) => {
        console.log('methodDecorator2')
        Reflect.defineMetadata(metaTwo, 'instance method 2', target, propertyKey)
    }
}

@Reflect.metadata(metaThree, 'class 3')
@classDecorator()
class Trail {
    @Reflect.metadata(metaThree, 'class method 3')
    @staticMethodDecorator()
    public static clsMethod() {}
    @Reflect.metadata(metaThree, 'instance method 3')
    @methodDecorator()
    @methodDecorator2() // 方法装饰器 从⬇️向⬆️
    public instMethod() {}
}

// 修饰器顺序：类 => 属性 => 方法

const trail = new Trail()

console.log('手动挂载 metadata start!!!!!!')

Reflect.defineMetadata(metaOne, 'class 1', Trail)
Reflect.defineMetadata(metaOne, 'class method 1', Trail, 'clsMethod')
Reflect.defineMetadata(metaOne, 'instance 1', trail)
Reflect.defineMetadata(metaOne, 'instance method 1', trail, 'instMethod')

console.log(Reflect.getMetadata(metaOne, Trail))
console.log(Reflect.getMetadata(metaOne, Trail, 'clsMethod'))
console.log(Reflect.getMetadata(metaOne, trail))
console.log(Reflect.getMetadata(metaOne, trail, 'instMethod'))

console.log('装饰器 + metadata start!!!!!!')

Reflect.defineMetadata(metaTwo, 'instance 2', trail)

console.log(Reflect.getMetadata(metaTwo, Trail))
console.log(Reflect.getMetadata(metaTwo, Trail, 'clsMethod'))
console.log(Reflect.getMetadata(metaTwo, trail))
console.log(Reflect.getMetadata(metaTwo, trail, 'instMethod'))

console.log('将 metadata 作为装饰器 start!!!!!!')

Reflect.defineMetadata(metaThree, 'instance 3', trail)

console.log(Reflect.getMetadata(metaThree, Trail))
console.log(Reflect.getMetadata(metaThree, Trail, 'clsMethod'))
console.log(Reflect.getMetadata(metaThree, trail))
console.log(Reflect.getMetadata(metaThree, trail, 'instMethod'))
