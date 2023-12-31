async function findPanorama() {
    let length = 0;
    let i = 0;
    while (length == 0) {
        try {
            const panoramas = await ymaps.panorama.locate([55.6 + Math.random() * 0.23, 37.38 + Math.random() * 0.4]); 
            length = panoramas.length;
            // Убеждаемся, что найдена хотя бы одна панорама.
            if (panoramas.length > 0) { 
                founded = true;
                // Создаем плеер с одной из полученных панорам.
                var player = new ymaps.panorama.Player(
                    'pano',
                    // Панорамы в ответе отсортированы по расстоянию
                    // от переданной в panorama.locate точки. Выбираем первую,
                    // она будет ближайшей.
                    panoramas[0],
                    // Зададим направление взгляда, отличное от значения
                    // по умолчанию.
                    { direction: [256, 16], controls: [] },
                );
                console.log(player.getPanorama().getPosition().join(', '));
            } else {
                console.log("panorama wasn't founded!")
            }
        } catch {
            // Если что-то пошло не так, сообщим об этом пользователю.
            alert(error.message);
        }
        i++;
        console.log(`${i} - len: ${length}, bool: ${(i >= 5) || (length > 0)}`)
        if ((i >= 25) || (length > 0)) {
            break;
        }
    }
}

ymaps.ready(function () {
    // Ищем панораму в переданной точке.

    // 55.604232, 37.386655 - левый нижний
    // 55.879429, 37.769319 - правый верхний 

    findPanorama();

    var myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10,
        controls: []
    }, {
        searchControlProvider: 'yandex#search'
    }),

        // Создаем геообъект с типом геометрии "Точка".
        myGeoObject = new ymaps.GeoObject({
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [55.752534, 37.621429]
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: 'Тут',
                hintContent: 'Тащи!'
            }
        }, {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: 'islands#blackStretchyIcon',
            // Метку можно перемещать.
            draggable: true
        })

    myMap.geoObjects
        .add(myGeoObject)

    myMap.events.add('click', function (e) {
        var coords = e.get('coords');
        myGeoObject.geometry.setCoordinates(coords);
    });
});

