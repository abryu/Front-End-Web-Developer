## Website Performance Optimization portfolio project

My challenge is to optimize this online portfolio for speed. In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques I've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository, inspect the code,

### Getting started

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! 


###MY OPTIMAZATION 

For part 1 to get a score larger than 90, I

	* Compress and resize images.

	* Combine inline CSS to eliminate render-blocking.

	* Add async tag to script.

	* Add print media tag.

	* Move google font to CSS file.

For part 2, I

	*  Pull out parse constants that need to be calculated repeatedly.

	*  Change querySelector to getElementsByClassName to accelerate.

	*  Diminish unnecessary pizzas from addEvenListener.



