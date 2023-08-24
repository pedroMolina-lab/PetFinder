import {Dropzone} from "dropzone"


export function InitDropzone(button){
    return new Dropzone(button, {
        url: "/falsa",
        autoProcessQueue: false,
      });

}