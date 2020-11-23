window.onload = function() {
    // Реализовать контекстное меню. Список хранить в памяти. При клике правой кнопкой мышии:
    // появляется контекстное меню в месте нажатяи кнопкой мыши(дизайн и принцип работы сделать точно такой же как работает в браузере)
    // список контекстного меню на ваше усмотрение
    // меню пропадает при нажатии в любом месте окна за границами контекстного меню
    // Хранить в списке action - название функции которая будет выполнятся при нажатии на пункт меню из задания №1 ( принцип работы как делали на практике)

    const data = { 
        name: 'menu', 
        items: [ 
        { 
            title: 'Option First', 
            handler: 'ActionFirst' 
        }, 

        { 
            title: 'Option Second', 
            handler: 'ActionSecond'
        }, 

        { 
            title: 'Option Third', 
            handler: 'ActionThird' 
        }, 
        { 
            title: 'Option Fourth', 
            handler: 'ActionFourth' 
        }, 
        { 
            title: 'Option Fifth', 
            handler: 'ActionFifth' 
        }] 
        }

    const actions = {
        ActionAdd: function() {console.log('ActionAdd')},
        ActionSaveAs: function() {console.log('ActionSaveAs')},
        ActionExit: function() { console.log('ActionExit')}
    }

    function MenuComponent(config, actions) {// принимает конфигурацию и действия
        this.config = config || {};
        this.actions = actions;
        this.container = null;//изначальное значение контейнера
    }

    MenuComponent.prototype.makeContainer = function() {//создание элемента контейнера 
        const container = document.createElement('ul');
        return container; //возвращаем контейнер и потом передаем его в метод создания элементов контейнера makeItems
    };

    MenuComponent.prototype.makeItems = function(container) {//создание компонентов контейнера
        const { items } = this.config;
        const fragment = document.createDocumentFragment();

        items.forEach(({title, handler}) => { //передаем данные из объекта дата
        const li = document.createElement('li');
        li.innerText = title;
        li.addEventListener('click', this.actions[handler]);
        fragment.append(li);
        });

        return fragment;
    };

    MenuComponent.prototype.makeMenu = function() {//метод для связи методов создание контейнера и его элементов
        const container = this.makeContainer();
        const items = this.makeItems();
        container.append(items);//адресовка элементов li в контейнер ul
        this.container = container;

        return this;
    };

    const contextMenu = document.querySelector('.contextMenu');   

    MenuComponent.prototype.render = function() {
        if (this.container) {// проверка существует ли элемент контейнер
        contextMenu.append(this.container);// адресовка контейнера в выбранный селектором див
        }

        return this;
    };

    const menu = new MenuComponent(data, actions);

    menu
    .makeMenu() //создание меню
    .render();  // адресовка созданного меню   

    document.addEventListener( "contextmenu", function(event) { //навешиваем событые вызова контекстного меню на правую кнопку
        event.preventDefault();
        contextMenu.classList.add('active');
        contextMenu.style.top = `${event.clientY}px`
        contextMenu.style.left = `${event.clientX}px`
    });

    document.addEventListener('click', function(event) { //деактивация контекстного меню
        contextMenu.classList.remove('active');
    });


}