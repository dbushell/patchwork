import {DinoSsr} from '@ssr/dinossr';

const dinossr = new DinoSsr(new URL(import.meta.resolve('./')).pathname);

await dinossr.init();
