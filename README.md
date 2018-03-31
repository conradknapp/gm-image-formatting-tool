# GM Playground

This repo is centered around learning the powerful gm/imagemagick libraries for image processing using Express/Node. 

## Resources

Here are some of the resources I've found useful in my development process:

- [Handling response streams with the fetch client (.blob())](https://developer.mozilla.org/en-US/docs/Web/API/Body/blob)
- [In-depth article on using the fetch API (beyond just the .json() method)](https://css-tricks.com/using-fetch/)
- [Documentation for using gm with Express](https://github.com/aheckmann/gm)

- [Thorough MDN article on CSS Form Validation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation)
- [CSS Tricks Post on Form Validation UX](https://css-tricks.com/form-validation-ux-html-css/)

- [Very Thorough and Interesting MDN article on the HTML5 File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Example_Using_object_URLs_to_display_images)
- [Useful MDN article on FileReader()](https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL)

I also found this helpful definition of blob urls on [Stack Overflow](https://stackoverflow.com/questions/14952052/convert-blob-url-to-normal-url/16179887#16179887):

```
A URL that was created from a JavaScript Blob can not be converted to a "normal" URL.

A blob: URL does not refer to data the exists on the server, it refers to data that your browser currently has in memory, for the current page. It will not be available on other pages, it will not be available in other browsers, and it will not be available from other computers.

Therefore it does not make sense, in general, to convert a Blob URL to a "normal" URL. If you wanted an ordinary URL, you would have to send the data from the browser to a server and have the server make it available like an ordinary file.

It is possible convert a blob: URL into a data: URL, at least in Chrome. You can use an AJAX request to "fetch" the data from the blob: URL (even though it's really just pulling it out of your browser's memory, not making an HTTP request).
```