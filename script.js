const getInp = document.querySelector('.btn__trigger');
const unicId = document.querySelector('.unicId');
const copyValueBtn = document.querySelector('.copy_id');
const inputIdValue = document.querySelector('.id__field');
const defaultValue = 'Your Id will be Here';
const formInputValue = document.querySelector('.form__element-input');
const formSelectValue = document.querySelector('.form__element-select');
const formSelectValue2 = document.querySelector('.form__element-select2');
const userSetting = {
  amountOfSymbolbs: formInputValue.value,
  separate: formSelectValue.value,
  lengthString: formSelectValue2.value,
};

formInputValue.addEventListener('change', (e) => {
  userSetting.amountOfSymbolbs = e.target.value;
});

formSelectValue.addEventListener('change', (e) => {
  userSetting.separate = e.target.value;
});

formSelectValue2.addEventListener('change', (e) => {
  userSetting.lengthString = e.target.value;
});

inputIdValue.value = defaultValue;

const checkValueInInput = () => {
  inputIdValue.value === defaultValue
    ? (copyValueBtn.disabled = true)
    : (copyValueBtn.disabled = false);
};

checkValueInInput();

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
  inputIdValue.value = generateId(i).match(lengthSeparate).join(s);

  return generateId(i).match(lengthSeparate).join(s);
};

getInp.addEventListener('click', () => {
  resultedString(
    userSetting.separate,
    +userSetting.amountOfSymbolbs,
    +userSetting.lengthString,
  );
  console.log(userSetting);
  checkValueInInput();
});

copyValueBtn.addEventListener('click', () => {
  inputIdValue.select();
  document.execCommand('copy');

  alert('Copied the text: ' + inputIdValue.value);
});
