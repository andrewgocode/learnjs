let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

const convert = (inputIn, InputOut) => {

    inputIn.addEventListener('input', () => {
        const requestPromise = () => {
            return new Promise((onSuccess, onError) => {
                let request = new XMLHttpRequest();
                
                request.open('GET', 'js/current.json');
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                request.addEventListener('load', function () {
                    if (request.readyState === 4 && request.status == 200) {
                        onSuccess(request);
                    } else {                        
                        onError();
                    }
                });
                request.send();
            });
        };

        requestPromise()
            .then((request) => {
                let data = JSON.parse(request.response);
                InputOut.value = inputIn.value / data.usd;
            })
            .catch( () => {
                InputOut.value = "Что-то пошло не так!";
            });
    });

};

convert(inputRub, inputUsd);