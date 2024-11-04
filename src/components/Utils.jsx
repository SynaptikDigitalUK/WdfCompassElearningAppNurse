class Utils {
  static removeUnsafeChars(str) { 

    // return str.toLowerCase().replaceAll(',', '').replaceAll(' ', '_').replaceAll('.', '').replaceAll(':', '').replaceAll('?', '')
    return  str.replace(/[ ]/g, "_").replace(/[,|.|:|?]/g, "")
    
  }


  static flatMapAlternative = (array, callback) => {
    return array.reduce((acc, item) => {
      const result = callback(item);
      return acc.concat(result);
    }, []);
  };

  
  
  static onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  
  // manually loop throuugh form elements and get values
  // oldscool way - to enable support for older browsers (safari 10)
  static getFormValues(formElement) {
    const values = {};
  
    const traverseNodes = (node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA' || node.tagName === 'SELECT') {
          const { name, type, value, checked, options } = node;
          if (name) {
            if (type === 'checkbox' || type === 'radio') {
              if (checked) {
                values[name] = value;
              }
            } else if (node.tagName === 'SELECT' && node.multiple) {
              values[name] = Array.from(options).filter(option => option.selected).map(option => option.value);
            } else {
              values[name] = value;
            }
          }
        }
        for (let child of node.childNodes) {
          traverseNodes(child);
        }
      }
    }


    traverseNodes(formElement);
    return values;

  }
  
  



}

export default Utils;