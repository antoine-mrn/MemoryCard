const imagesArray = ["apple", "banana", "brocoli", "cherry", "pepper", "straw", "apple", "banana", "brocoli", "cherry", "pepper", "straw"]

imagesShuffle = fisherYatesShuffle(imagesArray)

function fisherYatesShuffle(arr){
    for(let i =arr.length-1 ; i>0 ;i--){
        const j = Math.floor( Math.random() * (i+1));
        [arr[i],arr[j]]=[arr[j],arr[i]];
    }

    return arr
}

