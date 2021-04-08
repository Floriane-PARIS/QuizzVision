import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from 'src/models/quiz.model';
import { Question } from 'src/models/question.model';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  @Input()
  quiz: Quiz;
  //changes
  private leftchannel = [];
  private rightchannel = [];
  private recorder = null;
  private recordingLength = 0;
  private volume = null;
  private mediaStream = null;
  private sampleRate = 44100;
  private context = null;
  private blob = null;

  private startRecordingButton = document.getElementById("startRecordingButton");
  private stopRecordingButton = document.getElementById("stopRecordingButton");
  private playButton = document.getElementById("playButton");

  public questionForm: FormGroup;


  constructor(public formBuilder: FormBuilder, private quizService: QuizService) {
    // Form creation
    this.initializeQuestionForm();
  }

  private initializeQuestionForm(): void {
    this.questionForm = this.formBuilder.group({
      label: ['', Validators.required],
      answers: this.formBuilder.array([]),
    });
  }

  ngOnInit(): void {
  }

  get answers(): FormArray {
    return this.questionForm.get('answers') as FormArray;
  }

  private createAnswer(): FormGroup {
    return this.formBuilder.group({
      value: '',
      isCorrect: false,
    });
  }

  addAnswer(): void {
    this.answers.push(this.createAnswer());
  }

  addQuestion(): void {
    if (this.questionForm.valid) {
      const question = this.questionForm.getRawValue() as Question;
      this.quizService.addQuestion(this.quiz, question);
      this.initializeQuestionForm();
    }
  }

  playAudio(){
    this.playButton = document.getElementById("playButton");
    if (this.blob == null) {
      return;
  }
  var url = window.URL.createObjectURL(this.blob);
  var audio = new Audio(url);
  audio.play();
  }

  stopRecord(){

    // stop recording
    this.recorder.disconnect(this.context.destination);
    this.mediaStream.disconnect(this.recorder);

    // we flat the left and right channels down
    // Float32Array[] => Float32Array
    var leftBuffer = this.flattenArray(this.leftchannel, this.recordingLength);
    var rightBuffer = this.flattenArray(this.rightchannel, this.recordingLength);
    // we interleave both channels together
    // [left[0],right[0],left[1],right[1],...]
    var interleaved = this.interleave(leftBuffer, rightBuffer);

    // we create our wav file
    var buffer = new ArrayBuffer(44 + interleaved.length * 2);
    var view = new DataView(buffer);

    // RIFF chunk descriptor
    this.writeUTFBytes(view, 0, 'RIFF');
    view.setUint32(4, 44 + interleaved.length * 2, true);
    this.writeUTFBytes(view, 8, 'WAVE');
    // FMT sub-chunk
    this.writeUTFBytes(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // chunkSize
    view.setUint16(20, 1, true); // wFormatTag
    view.setUint16(22, 2, true); // wChannels: stereo (2 channels)
    view.setUint32(24, this.sampleRate, true); // dwSamplesPerSec
    view.setUint32(28, this.sampleRate * 4, true); // dwAvgBytesPerSec
    view.setUint16(32, 4, true); // wBlockAlign
    view.setUint16(34, 16, true); // wBitsPerSample
    // data sub-chunk
    this.writeUTFBytes(view, 36, 'data');
    view.setUint32(40, interleaved.length * 2, true);

    // write the PCM samples
    var index = 44;
    this.volume = 175;
    for (var i = 0; i < interleaved.length; i++) {
        view.setInt16(index, interleaved[i] * (0x7FFF * this.volume), true);
        index += 2;
    }
    // our final blob
    this.blob = new Blob([view], { type: 'audio/wav' });

  }

  startRecord(){
    // Initialize recorder
    navigator.getUserMedia = navigator.getUserMedia;
    navigator.getUserMedia(
    {
        audio: true
    },
   function (e) {
        console.log("user consent");

        // creates the audio context
        window.AudioContext = window.AudioContext;
        this.context = new AudioContext();

        // creates an audio node from the microphone incoming stream
        this.mediaStream = this.context.createMediaStreamSource(e);

        // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createScriptProcessor
        // bufferSize: the onaudioprocess event is called when the buffer is full
        var bufferSize = 2048;
        var numberOfInputChannels = 2;
        var numberOfOutputChannels = 2;
        if (this.context.createScriptProcessor) {
            this.recorder = this.context.createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels);
        } else {
            this.recorder = this.context.createJavaScriptNode(bufferSize, numberOfInputChannels, numberOfOutputChannels);
        }

        this.recorder.onaudioprocess = function (e) {
            this.leftchannel.push(new Float32Array(e.inputBuffer.getChannelData(0)));
            this.rightchannel.push(new Float32Array(e.inputBuffer.getChannelData(1)));
            this.recordingLength += bufferSize;
        }

        // we connect the recorder
        this.mediaStream.connect(this.recorder);
        this.recorder.connect(this.context.destination);
    },
                function (e) {
                    console.error(e);
                });
  }

download(){
    if (this.blob == null) {
      return;
  }

  var url = URL.createObjectURL(this.blob);

  var a = document.createElement("a");
  document.body.appendChild(a);
 //a.style = "display: none";
  a.href = url;
  a.download = "sample.wav";
  a.click();
  window.URL.revokeObjectURL(url);
}


  flattenArray(channelBuffer, recordingLength) {
      var result = new Float32Array(recordingLength);
      var offset = 0;
      for (var i = 0; i < channelBuffer.length; i++) {
          var buffer = channelBuffer[i];
          result.set(buffer, offset);
          offset += buffer.length;
      }
      return result;
  }

  interleave(leftChannel, rightChannel) {
      var length = leftChannel.length + rightChannel.length;
      var result = new Float32Array(length);

      var inputIndex = 0;

      for (var index = 0; index < length;) {
          result[index++] = leftChannel[inputIndex];
          result[index++] = rightChannel[inputIndex];
          inputIndex++;
      }
      return result;
  }

  writeUTFBytes(view, offset, string) {
      for (var i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
      }
  }

}



