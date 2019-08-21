
// This function parses the tt2 string and show the result in the
// form of a table. This is done to better understand the tt2
// TurboTags parameters effectively. It formats in such a way that
// each row on the table has:
// line -> represents the line number of the string
// tagName -> represents the name of the tag (this is actually property name)
// scope -> represents the scope of the tag e.g. pol0, carX, etc. (This is actually the category of the property)
// value1 -> represents the first value of the tag (if present)
// value2 -> represents the second value of the tag (if present)
// value3 -> represents the third value of the tag (if present)
// value4 -> represents the fourth value of the tag (if present)
const parseTT2 = () => {

  // checking if formatted output is on the screen
  if (document.getElementById('output-p').classList.length === 0) {
    // hiding formatted output to make space for parsed output
    document.getElementById('output-p').classList.add('hide')
  }

  // fetching raw input from the DOM in TT2 format in the form
  // of single long string i.e. without line breaks (carriage returns)
  const inputText = document.getElementById('input').value;
  // replacing the pattern of " " (space enclosed in quotes) - which is
  // the pattern indicating that a single tag has ended and there needs
  // to be a new line - with a \n (new line/carriage return) to make sure
  // the single line string has been converted to multi-line output
  const multiLineString = inputText.replace(/" "/g, '\"\n\"');
  // removing quotation marks "" from the multiLineString
  const stringWithoutQuotes = multiLineString.replace(/"/g, '')
  // converting the stringWithoutQuotes to an array of individual tags by
  // splitting it @ every \n
  const arrayOfTags = stringWithoutQuotes.split("\n")
  // creating an empty array tp be filled with the forEach method below
  const arrayOfArrayOfTags = []
  // this forEach method on arrayOfTags populates the arrayOfArrayOfTags
  // by converting an individual single tag element of arrayOfTags into
  // its own sub-array. e.g. it converts
  // ["nonowner,pol0,N", "isoperator,pol0,N", "broadform,pol0,N", .....]
  // to
  // [["nonowner","pol0","N"], ["isoperator","pol0","N"], ["broadform","pol0","N"], .....] 
  arrayOfTags.forEach(element => {
    arrayOfArrayOfTags.push(element.split(','))
  });
  // this forEach method on arrayOfArrayOfTags is appending its each member
  // with an integer line number to make it easy as to how many lines does
  // the policy data actually takes. e.g. it converts ["nonowner","pol0","N"]
  // to [1, "nonowner","pol0","N"].
  // NOTE: This line number has nothing to do with the logic of policy data.
  // This is just added to make it easy tou refer to a particular line number
  // when analyzing or debugging tt2 data
  arrayOfArrayOfTags.forEach((element, i) => {
    element.unshift(i + 1)
  })

  // removing the hide class from the output-table to make it visible
  document.getElementById('output-table').classList.remove('hide')

  // checking and removing any old output in the table
  if (document.getElementsByTagName('thead').hasChildNodes()) {
    console.log(document.getElementsByTagName('th'))
  }

  // creating <th> elemeents
  let tableBody = document.getElementById('output')
  let newRow = tableBody.insertRow()
  // creating new header cell for line #
  let newHeaderCell1 = document.createElement('th')
  newHeaderCell1.innerHTML = 'line';
  newRow.appendChild(newHeaderCell1)
  // creating new header cell for tagName
  let newHeaderCell2 = document.createElement('th')
  newHeaderCell2.innerHTML = 'tagName';
  newRow.appendChild(newHeaderCell2)
  // creating new header cell for scope
  let newHeaderCell3 = document.createElement('th')
  newHeaderCell3.innerHTML = 'scope';
  newRow.appendChild(newHeaderCell3)
  // creating new header cell for value1
  let newHeaderCell4 = document.createElement('th')
  newHeaderCell4.innerHTML = 'value1';
  newRow.appendChild(newHeaderCell4)
  // creating new header cell for value2
  let newHeaderCell5 = document.createElement('th')
  newHeaderCell5.innerHTML = 'value2';
  newRow.appendChild(newHeaderCell5)
  // creating new header cell for value3
  let newHeaderCell6 = document.createElement('th')
  newHeaderCell6.innerHTML = 'value3';
  newRow.appendChild(newHeaderCell6)
  // creating new header cell for value4
  let newHeaderCell7 = document.createElement('th')
  newHeaderCell7.innerHTML = 'value4';
  newRow.appendChild(newHeaderCell7)

  arrayOfArrayOfTags.forEach(rowData => {
    let tableBody = document.getElementById('output')
    let newRow = tableBody.insertRow()
    rowData.forEach(cellData => {
      let newCell = newRow.insertCell()
      newCell.innerHTML = cellData
    })

  })
};


// This function formats the tt2 string to a escaped string to
// ready to use for a JSON call. It looks for all the double-
// quotation mark - (") - in the string and replaces them with an
// escaped double-quotation mark - (\") - to make the string
// sendable via JSON
const formatTT2 = () => {
  // checking if parsed output is on the screen
  if (document.getElementById('output-table').classList.length === 0) {
    // hiding parsed output to make space for formatted output
    document.getElementById('output-table').classList.add('hide')
  }

  // fetching tt2 code input string from the textarea
  const inputText = document.getElementById('input').value;

  // replacing "(double-quotation marks) with \" to make it escaped string
  const result = inputText.replace(/"\n"/g, `"\\r"`).replace(/"/g, '\\"')
  // unhiding the hidden output paragraph
  document.getElementById('output-p').classList.remove('hide')

  // console.log(result)
  // updating the text node of the output paragraph with the results
  document.getElementById('output-p').innerHTML = result;
};

const parseJSON = () => {
  // checking if parsed output is on the screen
  // if (document.getElementById('output-table').classList.length === 0) {
  //   // hiding parsed output to make space for formatted output
  //   document.getElementById('output-table').classList.add('hide')
  // }

  // fetching tt2 code input string from the textarea
  const inputText = document.getElementById('input').value;

  // replacing escaped string - (\") - with double-quotation mark - 
  // (") - to make it readable JSON object
  const res1 = inputText.replace(/\\\"/g, '\"')
  // parsing the JSON object into a JS object
  const result = JSON.parse(res1)

  // unhiding the hidden output paragraph
  document.getElementById('output-table').classList.remove('hide')

  // console.log(result)
  // updating the text node of the output paragraph with the results
  console.log(result)

  // creating <th> elemeents
  let tableBody = document.getElementById('output')
  let newRow = tableBody.insertRow()
  let newHeaderCell = document.createElement('th')
  newHeaderCell.innerHTML = 'keys';
  newRow.appendChild(newHeaderCell)

  // for (const key in result) {
  //   let tableBody = document.getElementById('output-head')
  //   let newRow = tableBody.insertRow()
  //   let newCell1 = newRow.insertCell()
  //   newCell1.innerHTML = key;

  //   // document.getElementById('output-p').innerHTML += `"${key}": "${result[key]}" <br />`;
  //   console.log(`"${key}": "${result[key]}"`)
  // }
};


// This function reloads the page and is replacement to native html reset button
const reset = () => {
  document.location.reload()
}
