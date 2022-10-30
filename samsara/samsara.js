
const input = `This is a paragraph with a soft
line break.

This is another paragraph that has
> Some text that
> is in a
> block quote.

This is another paragraph with a ~~strikethrough~~ word and ~~more~~ and ~~more~~.`

const output = `<p>This is a paragraph with a soft<br />line break.</p>
<p>This is another paragraph that has <br />
  <blockquote>Some text that<br />is in a<br />block quote.</blockquote>
</p>

<p>This is another paragraph with a <del>strikethrough</del> word.</p>`


// 1. \n\n == <p>
// 2. \n == <br />  - easy softLine
// 3. ~~ == <del> 
// 4. >\s
// 5. ??? 

const parser = (str) => {
  /**
   * <p></p>
   * 
   */
  const arr = str.split(/\n/)
  // console.log(arr)
  /* [
      'This is a paragraph with a soft',    // <p>This is a paragraph with a soft<br />
      'line break.',                        // line break.
      '',                                   // </p>
      'This is another paragraph that has', // <p>This is another paragraph that has <br />
      '> Some text that',                   // <blockquote>Some text that<br />
      '> is in a',                          // is in a<br />
      '> block quote.',                     // block quote.</blockquote>
      '',                                   // </p>
      'This is another paragraph with a ~~strikethrough~~ word.' // <p>This is another paragraph with a <del>strikethrough</del> word.</p>
    ] 
  */

    /* 
    <p>This is a paragraph with a soft<br />
    line break.
    </p>
    <p>This is another paragraph that has<br />
    <blockquote>Some text that<br />
    is in a<br />
    block quote.</blockquote>
    </p>
    <p>This is another paragraph with a <del>strikethrough</del> word and <del>more</del> and <del>more</del>.</p>
    */

  function addOpeningParagraph(arr) {
    return arr.map((val, index) => {
      /**
       * <p>
       * 1. !prevChar == first sentence
       * 2. prevChar == '' // \n\n
       */
    const prevChar = arr[index - 1]
  
    if (prevChar === undefined) {
      return `<p>${val}`
    }
    if (prevChar === '') return `<p>${val}`
    if (prevChar === '</p>') return `<p>${val}`

    return val
    })
  }

  function addClosingParagraph(arr) {
    return arr.map((val, index) => {
      /**
       * </p>
       * 1. nextChar == ''
       * 2. nextChar == undefined
       */
      const nextChar = arr[index + 1]
      if (nextChar === '') return `${val}</p>`
      if (nextChar === undefined) return `${val}</p>`
      return val
    })
  }

  function addSoftLineBreak(arr) {
    return arr.map((val, index) => {
      /**
       * <br />
       * 1. val.endsWith('</p>') === false
       * &&
       * 2. val !== ''
       */
      if (val !== '' && !val.endsWith('</p>')) return `${val}<br />`
      return val
    })
  }

  function addOpeningBlockQuote(arr) {
    return arr.map((val, index) => {
      /**
       * <blockquote>
       * 1. prevChar.endsWith('<br />')
       * &&
       * 2. !prevChar.startsWith('> ')
       * &&
       * 3. val.startsWith('> ')
       */
      const prevChar = arr[index - 1]
      if (
        prevChar?.endsWith('<br />') && 
        !prevChar?.startsWith('> ') &&
        val.startsWith('> ')
      ) {
        return `<blockquote>${val.slice(2)}`
      }
      return val
    })
  }

  function addClosingBlockQuote(arr) {
    return arr.map((val, index) => {
      /**
       * </blockquote>
       * 1. val.startsWith('> ')
       * &&
       * 2. !nextChar.startsWith('> ')
       */
      const nextChar = arr[index + 1]
      if (
        val.startsWith('> ') && 
        !nextChar?.startsWith('> ')
      ) {
        if (val.endsWith('</p>')) return `${val.slice(0, val.length-4)}</blockquote></p>`
        return `${val}</blockquote>`
      }
      return val
    })
  }

  function addDel(arr) {
    const str = arr.join("")
    function replacer (match, p1, p2, p3) {
      return `<del>${p2}</del>`
    }
    const replaced = str.replace(/([~]{2})([a-z,A-Z]*)([~]{2})/g, replacer)
    return replaced
  }

  function clean(arr) {
    return arr.map((val, index) => {
      if (val.startsWith('> ')) return val.slice(2)
      return val
    })
  }

  function pipe(init, arr) {
    return arr.reduce((acc, fn) => {
      acc = fn(acc)
      return acc
    }, init)
  }

  const final = pipe(arr, [
    addOpeningParagraph,
    addClosingParagraph,
    addSoftLineBreak,
    addOpeningBlockQuote,
    addClosingBlockQuote,
    clean,
    addDel,
  ])


  return final
}




// console.log(parser(input))

