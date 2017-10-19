/**
 * JavaScript source code. Scope of an audio file 
 * Author: Andrej Hristoliubov
 * email: anhr@mail.ru
 * About me: http://anhr.ucoz.net/AboutMe/
 * example: http://anhr.ucoz.net/ToneGenerator/
 * Thanks to https://developer.mozilla.org/en-US/docs/Web/API/MediaElementAudioSourceNode
 * Licences: GPL, The MIT License (MIT)
 * Copyright: (c) 2015 Andrej Hristoliubov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 * Revision:
 *  2017-10-19, : 
 *       + init.
 *
 */

var MediaElementAudio = {
    Scope: function (elAudio, audioCtx, scope) {
        if (myAudio.myAudio != undefined)
            return;
        elAudio.myAudio = {};
        elAudio.onplay = function () {
            if (elAudio.myAudio.source != undefined)
                return;

            // Create a MediaElementAudioSourceNode
            // Feed the HTMLMediaElement into it
            elAudio.myAudio.source = audioCtx.createMediaElementSource(elAudio);

            // Create a gain node
            var gainNode = audioCtx.createGain();

            // connect the AudioBufferSourceNode to the gainNode
            // and the gainNode to the destination, so we can play the
            // music and adjust the volume using the mouse cursor
            elAudio.myAudio.source.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            elAudio.myAudio.source.connect(scope.input);
        };
    }
}
