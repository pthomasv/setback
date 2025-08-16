// import C2 from "../client/src/face/2C@3x.png";
// import C3 from "../client/src/face/3C@3x.png";
// import C4 from "../client/src/face/4C@3x.png";
// import C5 from "../client/src/face/5C@3x.png";
// import C6 from "../client/src/face/6C@3x.png";
// import C7 from "../client/src/face/7C@3x.png";
// import C8 from "../client/src/face/8C@3x.png";
// import C9 from "../client/src/face/9C@3x.png";
// import CT from "../client/src/face/TC@3x.png";
// import CJ from "../client/src/face/JC@3x.png";
// import CQ from "../client/src/face/QC@3x.png";
// import CK from "../client/src/face/KC@3x.png";
// import CA from "../client/src/face/AC@3x.png";

// import S2 from "../client/src/face/2S@3x.png";
// import S3 from "../client/src/face/3S@3x.png";
// import S4 from "../client/src/face/4S@3x.png";
// import S5 from "../client/src/face/5S@3x.png";
// import S6 from "../client/src/face/6S@3x.png";
// import S7 from "../client/src/face/7S@3x.png";
// import S8 from "../client/src/face/8S@3x.png";
// import S9 from "../client/src/face/9S@3x.png";
// import ST from "../client/src/face/TS@3x.png";
// import SJ from "../client/src/face/JS@3x.png";
// import SQ from "../client/src/face/QS@3x.png";
// import SK from "../client/src/face/KS@3x.png";
// import SA from "../client/src/face/AS@3x.png";

// import H2 from "../client/src/face/2H@3x.png";
// import H3 from "../client/src/face/3H@3x.png";
// import H4 from "../client/src/face/4H@3x.png";
// import H5 from "../client/src/face/5H@3x.png";
// import H6 from "../client/src/face/6H@3x.png";
// import H7 from "../client/src/face/7H@3x.png";
// import H8 from "../client/src/face/8H@3x.png";
// import H9 from "../client/src/face/9H@3x.png";
// import HT from "../client/src/face/TH@3x.png";
// import HJ from "../client/src/face/JH@3x.png";
// import HQ from "../client/src/face/QH@3x.png";
// import HK from "../client/src/face/KH@3x.png";
// import HA from "../client/src/face/AH@3x.png";

// import D2 from "../client/src/face/2D@3x.png";
// import D3 from "../client/src/face/3D@3x.png";
// import D4 from "../client/src/face/4D@3x.png";
// import D5 from "../client/src/face/5D@3x.png";
// import D6 from "../client/src/face/6D@3x.png";
// import D7 from "../client/src/face/7D@3x.png";
// import D8 from "../client/src/face/8D@3x.png";
// import D9 from "../client/src/face/9D@3x.png";
// import DT from "../client/src/face/TD@3x.png";
// import DJ from "../client/src/face/JD@3x.png";
// import DQ from "../client/src/face/QD@3x.png";
// import DK from "../client/src/face/KD@3x.png";
// import DA from "../client/src/face/AD@3x.png";

let cards = [
[14, "SA"],
[13, "SK"],
[12, "SQ"],
[11, "SJ"],
[10, "ST"],
[9, "S9"],
[8, "S8"],
[7, "S7"],
[6, "S6"],
[5, "S5"],
[4, "S4"],
[3, "S3"],
[2, "S2"],


[14, "CA"],
[13, "CK"],
[12, "CQ"],
[11, "CJ"],
[10, "CT"],
[9, "C9"],
[8, "C8"],
[7, "C7"],
[6, "C6"],
[5, "C5"],
[4, "C4"],
[3, "C3"],
[2, "C2"],


[2, "H2"],
[3, "H3"],
[4, "H4"],
[5, "H5"],
[6, "H6"],
[7, "H7"],
[8, "H8"],
[9, "H9"],
[10, "HT"],
[11, "HJ"],
[12, "HQ"],
[13, "HK"],
[14, "HA"],

[2, "D2"],
[3, "D3"],
[4, "D4"],
[5, "D5"],
[6, "D6"],
[7, "D7"],
[8, "D8"],
[9, "D9"],
[10, "DT"],
[11, "DJ"],
[12, "DQ"],
[13, "DK"],
[14, "DA"]
]


function FYshuffle(arr) {
    var i = arr.length, j, temp;
    while(--i > 0){
      j = Math.floor(Math.random()*(i+1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
  }

class Queue {
    constructor() {
        this.items = {}
        this.frontIndex = 0
        this.backIndex = 0
    }
    enqueue(item) {
        this.items[this.backIndex] = item
        this.backIndex++
        return item + ' inserted'
    }
    dequeue() {
        const item = this.items[this.frontIndex]
        delete this.items[this.frontIndex]
        this.frontIndex++
        return item
    }
    peek() {
        return this.items[this.frontIndex]
    }

    length(){
      return this.backIndex - this.frontIndex;
    }


    get printQueue() {
        return this.items;
    }
}


export{cards}
export{Queue}
export{FYshuffle}