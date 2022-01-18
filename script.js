const getInp = document.querySelector('button');
const unicId = document.querySelector('.unicId');
const userSetting = {
  separate: null,
  amountOfSymbolbs: null,
  lengthString: null,
};
const copyValueBtn = document.querySelector('.copy_id');
const inputIdValue = document.querySelector('#inputIdValue');

const getRandomSymbol = (min = 48, max = 122) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateId = (numberOfIteration = 20) => {
  const charCode = String.fromCharCode;
  const charRgx = /[/<>[\]`;?:''=/!@#$%^&*()_/\\]/g;
  let generateString = '';

  for (let i = 0; i < numberOfIteration; i++) {
    generateString += charCode(getRandomSymbol()).replace(
      charRgx,
      charCode(getRandomSymbol(97, 122)),
    );
  }

  return generateString;
};

const resultedString = (s = '-', i = 15, l = 5) => {
  if (i > 50 || i < 4 || l < 3) {
    throw new Error(
      `Check your input settings.You cannot set a value greater than 50 and less than 3. 
      You can leave the default settings and you will get 15 characters divided into 3 separate groups.`,
    );
  }

  const lengthSeparate = new RegExp('.{1,' + l + '}', 'g');
  // unicId.innerHTML = generateId(i).match(lengthSeparate).join(s);
  inputIdValue.value = generateId(i).match(lengthSeparate).join(s);

  return generateId(i).match(lengthSeparate).join(s);
};

getInp.addEventListener('click', () => {
  resultedString('_', 15, 5);
});

copyValueBtn.addEventListener('click', () => {
  inputIdValue.select();
  document.execCommand('copy');

  alert('Copied the text: ' + inputIdValue.value);
});

// console.log(String.fromCharCode(97, 122)); // Range of Low register
// console.log(String.fromCharCode(65, 90)); // Range of High register
// console.log(String.fromCharCode(48, 57)); // Range of Numbers
