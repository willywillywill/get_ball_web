
function read_config_data(opt){
    let oReq = new XMLHttpRequest();
    oReq.addEventListener("load", function (){
        let config_json = JSON.parse(this.responseText);
        opt(config_json)
    });
    oReq.open("GET", "http://localhost:3000/config_json");
    oReq.send();
}
function post_config_data(key,value){
    let oReq = new XMLHttpRequest();
    oReq.open("GET", `http://localhost:3000/config_post?info={${key}:${value}}`);
    oReq.send();
}

let bottom_left_block = document.getElementById("bottom_left_block");
for (let i=0 ; i<4 ; i++){
    bottom_left_block.innerHTML +="<div class='bottom_left_block_pos'>"+
    `loc${i}：`+
    `<input class='pos_input' type='number' id='loc_${i}'>`+
    "<br>"+
    `lac${i}：`+
    `<input class='pos_input' type='number' id='lac_${i}'>`+
    "<br>"+
    "</div>";

    read_config_data((info)=>{
        document.getElementById(`loc_${i}`).value = info["pos"][`loc_${i}`];
        document.getElementById(`lac_${i}`).value = info["pos"][`lac_${i}`];
    });
}
for (let i=0; i<4 ; i++){
    document.getElementById(`loc_${i}`).addEventListener("input", (e)=>{
        if (e.target.value)
            post_config_data(`loc_${i}`,e.target.value);
    });
    document.getElementById(`lac_${i}`).addEventListener("input", (e)=>{
        if (e.target.value)
            post_config_data(`'lac_${i}'`,e.target.value);
    });
}

// nodemon app.js