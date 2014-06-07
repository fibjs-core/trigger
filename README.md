#event for fibjs

#### **事件触发对象，可用于建立观察者模式**

###API

- on(String ev, Function func) 
    >绑定一个事件处理函数到对象
    参数:
    ev	指定事件的名称
    func	指定事件处理函数

- on(Object map)
    >绑定一个事件处理函数到对象
    参数:
    map	指定事件映射关系，对象属性名称将作为事件名称，属性的值将作为事件处理函数

- once(String ev, Function func)
    >绑定一个一次性事件处理函数到对象，一次性处理函数只会触发一次
    参数
    ev	指定事件的名称
    func	指定事件处理函数

- once(Object map)
    >绑定一个一次性事件处理函数到对象，一次性处理函数只会触发一次
    参数
    map	指定事件映射关系，对象属性名称将作为事件名称，属性的值将作为事件处理函数

- off(String ev, Function func)		
    >从对象处理队列中取消指定函数
    参数
    ev	指定事件的名称
    func	指定事件处理函数

- off(Object map)
    >从对象处理队列中取消指定函数
    参数
    map	指定事件映射关系，对象属性名称作为事件名称，属性的值作为事件处理函数

- trigger(String ev, ...)		
    >主动触发一个事件
    参数
    ev	事件名称
    ...	事件参数，将会传递给事件处理函数