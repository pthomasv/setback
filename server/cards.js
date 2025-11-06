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
    [14, "AS"],
    [13, "KS"],
    [12, "QS"],
    [11, "JS"],
    [10, "TS"],
    [9, "9S"],
    [8, "8S"],
    [7, "7S"],
    [6, "6S"],
    [5, "5S"],
    [4, "4S"],
    [3, "3S"],
    [2, "2S"],
    
    [14, "AC"],
    [13, "KC"],
    [12, "QC"],
    [11, "JC"],
    [10, "TC"],
    [9, "9C"],
    [8, "8C"],
    [7, "7C"],
    [6, "6C"],
    [5, "5C"],
    [4, "4C"],
    [3, "3C"],
    [2, "2C"],
    
    [2, "2H"],
    [3, "3H"],
    [4, "4H"],
    [5, "5H"],
    [6, "6H"],
    [7, "7H"],
    [8, "8H"],
    [9, "9H"],
    [10, "TH"],
    [11, "JH"],
    [12, "QH"],
    [13, "KH"],
    [14, "AH"],
    
    [2, "2D"],
    [3, "3D"],
    [4, "4D"],
    [5, "5D"],
    [6, "6D"],
    [7, "7D"],
    [8, "8D"],
    [9, "9D"],
    [10, "TD"],
    [11, "JD"],
    [12, "QD"],
    [13, "KD"],
    [14, "AD"]
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