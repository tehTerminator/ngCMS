import { FormGroup, ValidatorFn, Validator, ValidationErrors } from '@angular/forms';
import { ElementRef, Renderer2 } from '@angular/core';

export class Captcha {

    private static numberArray = [
        { id: 1, text: 'One' },
        { id: 2, text: 'Two' },
        { id: 3, text: 'Three' },
        { id: 4, text: 'Four' },
        { id: 5, text: 'Five' },
        { id: 6, text: 'Six' },
        { id: 7, text: 'Seven' },
        { id: 8, text: 'Eight' },
        { id: 9, text: 'Nine' },
        { id: 0, text: 'Zero' }
    ];

    /**
     * Generates a Random Captcha
     */
    public static generate(): string {
        return Captcha.textify(Math.floor(Math.random() * 1000));
    }

    public static validator(question: string): ValidatorFn {
        return (control: FormGroup): { [key: string]: any } | null => {
            const answer = +control.value;
            if (Captcha.textToNumber(question) !== answer) {
                return { captcha: { value: control.value } };
            }
            return null;
        };
    }

    /**
     * Draw Captcha Question Using HTML Canvas
     * @param renderer Renderer2 Provided By Angular
     * @param element Parent Element Where Question Needs to be Drawn
     * @param text Captcha Question
     */
    public static draw(renderer: Renderer2, element: ElementRef, question: string) {
        try {
            const canvas: HTMLCanvasElement = renderer.createElement('canvas');
            const ctx: CanvasRenderingContext2D = canvas.getContext('2d');

            renderer.setAttribute(canvas, 'width', '250');
            renderer.setAttribute(canvas, 'height', '50');

            ctx.font = '30px Arial';
            ctx.strokeText(question, 5, 30);
            renderer.appendChild(element.nativeElement, canvas);
        } catch (e) {
            console.log('Error Occurred While Drawing', e);
        }
    }

    private static textify(someNumber: number): string {
        const str = someNumber.toString();
        let output = '';
        for (const char of str) {
            output += Captcha.numberArray.find(x => x.id === +char).text + '-';
        }
        return output.substr(0, output.length - 1);
    }

    private static textToNumber(someText: string): number {
        const numbers = someText.split('-');
        let output = '0';
        for (const n of numbers) {
            output += Captcha.numberArray.find(x => x.text === n).id;
        }
        return +output;
    }

}
