import {DinoServer} from 'dinossr';

const dinossr = new DinoServer(new URL('./', import.meta.url).pathname);

await dinossr.init();
