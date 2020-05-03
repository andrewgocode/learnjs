class Options {
    constructor(height, width, bg, fontSize, textAlign){
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;
    }

    craeteDiv(){
        const div = document.createElement('div');
        const text = document.createTextNode('some unimportant text');
    
        div.style.cssText = `height: ${this.height};
        width: ${this.width};
        background-color: ${this.bg};
        font-size: ${this.fontSize};
        text-align: ${this.textAlign};
        `;
        div.appendChild(text);

            const root = document.getElementById('root');
        root.appendChild(div);
    }
}

const divObj = new Options("300px", "250px", 'green', '30px', 'center');
divObj.craeteDiv();