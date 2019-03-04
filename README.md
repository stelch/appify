# Appify

Appify is a simple JavaScipt libary for turning boring old websites into Fluid applications.

### Installing

The instalation is made to be very simple, just do the following.

Insert the following into the ``<head>`` element of your to be Application.
```html
<script src="applet.js" onload="applet.conf.applet_element='``{AppletJS body element}``';" type="text/javascript"></script>
```

And for each link

Before:
```html
<a href="#">Example</a>
```

After:
```html
<a href="#" -applet-data-link="``{Page title}``" onclick="applet.page.set('``{Page title}``');">Example</a>
```

## Authors

* **Ryan W** - *Initial work* - [AspyTheAussie](https://github.com/AspyTheAussie)

See also the list of [contributors](https://github.com/stelch/appify/contributors) who participated in this project.

## License

- see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* This software is still in early Alpha
