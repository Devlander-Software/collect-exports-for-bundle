import { blue, green, red } from 'picocolors';
import { TColor } from './types';


export const colorfulLog = (message: string, color:TColor) => {
    switch (color) {
      case 'green':
        console.log(green(message));
        break;
      case 'red':
        console.log(red(message));
        break;
      case 'blue':
        console.log(blue(message));
        break;
      default:
        console.log(message);
    }
  };