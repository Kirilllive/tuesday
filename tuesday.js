var story_json;
var tuesday;
var text_view;
var text_block;
var name_block = document.createElement("div");
var languare;
var scene = 0;
var dialog = 0;
var dialog_text;
var dialog_speed = 50;
var dialog_letter = 0;
var dialog_timeout;
var story;
var tue_bg_music;
function get_lang() {
    if (navigator.languages != undefined) {
        languare = navigator.languages[0].substring(0,2);
    } else {
        languare = navigator.languagesubstring(0,2)
    }
    var support;
    for (i = 0; i < story_json.parameters.languares.length; i++){
        if (languare == story_json.parameters.languares[i]) {
            support = true
        }
    }
    if (!support){
        languare = story_json.parameters.languares[0]
    }
} function load_story(url) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && (this.status == 200 || this.status == 0)) {
                story_json = JSON.parse(this.responseText);
                get_lang();
                dialog_speed = story_json.parameters.text_panel.dialog_speed;
                tuesday = document.getElementById("tuesday");
                tuesday.style.backgroundRepeat = "no-repeat";
                tuesday.style.backgroundSize = "cover";
                tuesday.style.backgroundPosition = "center";
                tuesday.style.position = "relative"
                tuesday.style.overflow = "hidden";
                tuesday.innerHTML = "<table id='text_block' align='center'><tbody><tr><td id='text_view'></td></tr></tbody></table>";
                text_block = document.getElementById("text_block");
                if(story_json.parameters.text_panel.className){text_block.className = story_json.parameters.text_panel.className;}
                if(story_json.parameters.text_panel.style){text_block.style = story_json.parameters.text_panel.style;}
                text_block.style.position = "absolute";
                text_block.style.bottom = story_json.parameters.text_panel.indent_bottom;
                text_block.style.width = story_json.parameters.text_panel.size_panel[0];
                text_block.style.height = story_json.parameters.text_panel.size_panel[1];
                text_block.style.left= "0";
                text_block.style.right= "0";
                text_block.style.zIndex = "1000";
                text_view = document.getElementById("text_view");
                text_view.style.padding = story_json.parameters.text_panel.indent_text;
                text_view.style.fontSize = story_json.parameters.text_panel.size_text;
                if (story_json.parameters.name_panel) {
                    if(story_json.parameters.name_panel.className){name_block.className = story_json.parameters.name_panel.className;}
                    if(story_json.parameters.name_panel.style){name_block.style = story_json.parameters.name_panel.style;}
                    name_block.style.position = "absolute";
                    name_block.id = "name_block";
                    name_block.style.padding = story_json.parameters.name_panel.indent_text;
                    name_block.style.fontSize = story_json.parameters.name_panel.size_text;
                    name_block.style.textAlign = "center";
                    if (name_block.style.width = story_json.parameters.name_panel.size_panel[0] != 0) {name_block.style.width = story_json.parameters.name_panel.size_panel[0];}
                    name_block.style.height = story_json.parameters.name_panel.size_panel[1];
                    name_block.style.lineHeight = story_json.parameters.name_panel.size_panel[1];
                    if (story_json.parameters.name_panel.position[0] != 0){name_block.style.left = story_json.parameters.name_panel.position[0];}
                    if (story_json.parameters.name_panel.position[1] != 0){name_block.style.right = story_json.parameters.name_panel.position[1];}
                    if (story_json.parameters.name_panel.position[2] != 0){name_block.style.top = story_json.parameters.name_panel.position[2];}
                    if (story_json.parameters.name_panel.position[3] != 0){name_block.style.bottom = story_json.parameters.name_panel.position[3];}
                    name_block.style.zIndex = 1001;
                    text_block.appendChild(name_block);
                }
                tue_bg_music = document.createElement("AUDIO");
                tue_bg_music.id = "tue_bg_music";
                tuesday.appendChild(tue_bg_music);
                story = story_json.parameters.launch_story
                creation_buttons();
                creation_scene();
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
} function creation_buttons() {
    for (i = 0; i < story_json.parameters.buttons.length; i++){
        var button = document.createElement("div");
        if(story_json.parameters.buttons[i].className){button.className = story_json.parameters.buttons[i].className;}
        if(story_json.parameters.buttons[i].style){button.style = story_json.parameters.buttons[i].style;}
        button.style.zIndex = 2000 + i;
        button.id = story_json.parameters.buttons[i].name;
        button.classList.add("tue_controll");
        button.style.position = "absolute";
        button.style.width = story_json.parameters.buttons[i].size[0];
        button.style.height = story_json.parameters.buttons[i].size[1];
        button.style.backgroundColor = story_json.parameters.buttons[i].color;
        button.style.backgroundRepeat = "no-repeat";
        button.style.backgroundPosition = "center";
        button.style.backgroundImage = "url('" + story_json.parameters.buttons[i].art + "')";
        button.style.backgroundSize = story_json.parameters.buttons[i].art_size[0] + " " + story_json.parameters.buttons[i].art_size[1];
        if (story_json.parameters.buttons[i].position[0] != 0){button.style.left = story_json.parameters.buttons[i].position[0];}
        if (story_json.parameters.buttons[i].position[1] != 0){button.style.right = story_json.parameters.buttons[i].position[1];}
        if (story_json.parameters.buttons[i].position[2] != 0){button.style.top = story_json.parameters.buttons[i].position[2];}
        if (story_json.parameters.buttons[i].position[3] != 0){button.style.bottom = story_json.parameters.buttons[i].position[3];}
        tuesday.appendChild(button);
    }
    if(document.getElementById('next')){document.getElementById('next').addEventListener('click', function() {go_story ()});}
    if(document.getElementById('back')){document.getElementById('back').addEventListener('click', function() {back_story ()});}
    if(document.getElementById('home')){
        var g = story_json.parameters.launch_story;
        document.getElementById('home').addEventListener('click', function() {go_to(g)});
    }
    if(document.getElementById('save')){document.getElementById('save').addEventListener('click',
         function() {
         localStorage.setItem("tuesday_scene", scene);
         localStorage.setItem("tuesday_dialog", dialog);
         localStorage.setItem("tuesday_story", story);
         }
    );}
    if(document.getElementById('load')){document.getElementById('load').addEventListener('click',function(){load_stag()});}
} function creation_scene() {
    if(story_json[story][scene].background_image){tuesday.style.backgroundImage = "url('" + story_json[story][scene].background_image[languare] + "')";}
    var buttons = document.getElementById("tuesday").getElementsByClassName("tue_controll");
    for (var i = 0; i < buttons.length; i++) {
        if (story == story_json.parameters.launch_story){buttons[i].style.visibility = "hidden";}
        else {buttons[i].style.visibility = "visible";}
    }
    creation_dialog ();
    if(story_json[story][scene].background_music){
        if (tue_bg_music.canPlayType("audio/mpeg")) {
            tue_bg_music.setAttribute("src", story_json[story][scene].background_music+".m4a");
            } else {
            tue_bg_music.setAttribute("src", story_json[story][scene].background_music+".ogg");
        }
        tue_bg_music.loop = true;
        tue_bg_music.play();
    }
} function creation_dialog () {
    if (story_json[story][scene].dialogs[dialog].color_panel) {text_block.style.backgroundColor = story_json[story][scene].dialogs[dialog].color_panel;}
    else if (story_json.parameters.text_panel.color_panel) {text_block.style.backgroundColor = story_json.parameters.text_panel.color_panel;}
    text_view.style.color = story_json[story][scene].dialogs[dialog].color_text;
    if (story_json[story][scene].dialogs[dialog].text){
        text_block.style.visibility = 'visible';
        text_view.innerHTML = "";
        dialog_text = story_json[story][scene].dialogs[dialog].text[languare];
        dialog_letter = 0;
        clearTimeout(dialog_timeout);
        anim_text();
    } else {text_block.style.visibility = 'hidden';}
    if (story_json[story][scene].dialogs[dialog].name) {
        name_block.style.backgroundColor = story_json[story][scene].dialogs[dialog].name.color_panel;
        name_block.style.color = story_json[story][scene].dialogs[dialog].name.color_text;
        name_block.innerHTML = story_json[story][scene].dialogs[dialog].name[languare]
        name_block.style.visibility = 'visible';
    } else {name_block.style.visibility = 'hidden';}
    del_element("tue_art");
    if (story_json[story][scene].dialogs[dialog].art){
        for (i = 0; i < story_json[story][scene].dialogs[dialog].art.length; i++){
            var art = document.createElement("img");
            art.src = story_json[story][scene].dialogs[dialog].art[i].url[languare];
            art.className = "tue_art"
            if(story_json[story][scene].dialogs[dialog].art[i].style){art.style = story_json[story][scene].dialogs[dialog].art[i].style;}
            art.style.position = "absolute";
            art.style.width = story_json[story][scene].dialogs[dialog].art[i].size[0];
            art.style.height = story_json[story][scene].dialogs[dialog].art[i].size[1];
            if (story_json[story][scene].dialogs[dialog].art[i].position[0] != 0){art.style.left= story_json[story][scene].dialogs[dialog].art[i].position[0];}
            if (story_json[story][scene].dialogs[dialog].art[i].position[1] != 0){art.style.right= story_json[story][scene].dialogs[dialog].art[i].position[1];}
            if (story_json[story][scene].dialogs[dialog].art[i].position[2] != 0){art.style.top= story_json[story][scene].dialogs[dialog].art[i].position[2];}
            if (story_json[story][scene].dialogs[dialog].art[i].position[3] != 0){art.style.bottom= story_json[story][scene].dialogs[dialog].art[i].position[3];}
            tuesday.appendChild(art);
        }
    }
    if (story_json[story][scene].dialogs[dialog].select) {
        for (i = 0; i < story_json[story][scene].dialogs[dialog].select.length; i++) {
            var select = document.createElement("div");
            if(story_json[story][scene].dialogs[dialog].select[i].className){select.className = story_json[story][scene].dialogs[dialog].select[i].className;}
            if(story_json[story][scene].dialogs[dialog].select[i].style){select.style = story_json[story][scene].dialogs[dialog].select[i].style;}
            select.classList.add("tue_select");
            select.style.position = "absolute";
            select.style.backgroundColor = story_json[story][scene].dialogs[dialog].select[i].color;
            select.style.backgroundRepeat = "no-repeat";
            select.style.backgroundPosition = "center";
            select.style.backgroundImage = "url('" + story_json[story][scene].dialogs[dialog].select[i].art + "')";
            if (select.style.width = story_json[story][scene].dialogs[dialog].select[i].size[0] != 0) {
                select.style.width = story_json[story][scene].dialogs[dialog].select[i].size[0];}
            if (select.style.height = story_json[story][scene].dialogs[dialog].select[i].size[1] != 0) {
                select.style.height = story_json[story][scene].dialogs[dialog].select[i].size[1];
                select.style.lineHeight = story_json[story][scene].dialogs[dialog].select[i].size[1];
            }
            if (story_json[story][scene].dialogs[dialog].select[i].art_size){select.style.backgroundSize = story_json[story][scene].dialogs[dialog].select[i].art_size[0] + " " + story_json[story][scene].dialogs[dialog].select[i].art_size[1];}
            if (story_json[story][scene].dialogs[dialog].select[i].position[0] != 0){select.style.left = story_json[story][scene].dialogs[dialog].select[i].position[0];}
            if (story_json[story][scene].dialogs[dialog].select[i].position[1] != 0){select.style.right = story_json[story][scene].dialogs[dialog].select[i].position[1];}
            if (story_json[story][scene].dialogs[dialog].select[i].position[2] != 0){select.style.top = story_json[story][scene].dialogs[dialog].select[i].position[2];}
            if (story_json[story][scene].dialogs[dialog].select[i].position[3] != 0){select.style.bottom = story_json[story][scene].dialogs[dialog].select[i].position[3];}
            select.style.color = story_json[story][scene].dialogs[dialog].select[i].color_text;
            select.style.padding = story_json[story][scene].dialogs[dialog].select[i].indent_text;
            select.style.fontSize = story_json[story][scene].dialogs[dialog].select[i].size_text;
            select.style.textAlign = "center";
            if(story_json[story][scene].dialogs[dialog].select[i].text){select.innerHTML = story_json[story][scene].dialogs[dialog].select[i].text[languare];}
            var g = story_json[story][scene].dialogs[dialog].select[i].go_to;
            if (g == "load") {select.setAttribute("onclick","load_stag()");}
            else {
                select.setAttribute("onclick","go_to('" + g + "')");
            }
            tuesday.appendChild(select);
        }
    }
} function go_story() {
    if (story_json[story][scene].dialogs[dialog].go_to) {
        var go = story_json[story][scene].dialogs[dialog].go_to;
        go_to(go)
    } else if (dialog < story_json[story][scene].dialogs.length - 1){
        dialog++;
        creation_dialog ();
    } else {
        scene++;
        if (scene >= story_json[story].length){scene = story_json[story].length - 1;}
        else {
            dialog = 0;
            creation_scene();
        }
    }
} function back_story() {
    if (story_json[story][scene].dialogs[dialog].back_to) {
        var go = story_json[story][scene].dialogs[dialog].back_to;
        go_to(go)
    } else if (dialog > 0){
        dialog = dialog - 1;
        creation_dialog ();
    } else {
        scene = scene - 1;
        if (scene < 0){ scene = 0; }
        else {
            dialog = story_json[story][scene].dialogs.length - 1;
            creation_scene();
        }
    }
} function load_stag() {
    del_element("tue_select")
    scene = localStorage.getItem("tuesday_scene");
    dialog = localStorage.getItem("tuesday_dialog");
    story = localStorage.getItem("tuesday_story");
    creation_scene();
	search_music ();
} function go_to(go) {
    del_element("tue_select")
    dialog = 0;
    scene = 0;
    story = go;
    creation_scene();
} function del_element (element) {
    var del = document.getElementById("tuesday").getElementsByClassName(element);
    var len = del.length;
    for (var i = 0; i < len; i++) {
            del[0].parentNode.removeChild(del[0]);
    }
} function anim_text() {
    if (dialog_speed == 0){text_view.innerHTML = dialog_text;}
    else if (dialog_speed != 0 && dialog_letter <= dialog_text.length){dialog_timeout = setTimeout(add_letter, dialog_speed);}
} function add_letter() {
    text_view.innerHTML = dialog_text.slice(0,dialog_letter);
    dialog_letter++;
    anim_text();
} function search_music() {
	 for (var i = scene; i >= 0; i--) {
		if(story_json[story][i].background_music){
			if (tue_bg_music.canPlayType("audio/mpeg")) {
				tue_bg_music.setAttribute("src", story_json[story][i].background_music+".m4a");
				} else {
				tue_bg_music.setAttribute("src", story_json[story][i].background_music+".ogg");
			}
			tue_bg_music.loop = true;
			tue_bg_music.play();
			break;
		}
	}
}