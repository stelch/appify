# Appify

Appify is a simple JavaScipt libary for turning boring old websites into Fluid applications.

### Installing

The instalation is made to be very simple, just do the following.

Insert the following into the ``<head>`` element of your to be Application.
```
<script src=//stelch.com/projects/api/libaries/appify.js></script>
```

And for each link

Before:
```
<a href="#">Example</a>
```

After:
```
<a href="#" onclick="appify.setpage('#')">Example</a>
```

And finally, at the end of the page. Configure it!

```
    document.body.onload=function(){appify.load({
        app_title:"**INSERT DESIRED NAME**",
        app_desc:"**SMALL DESCRIPTION**",
        icon:"**FULL LOCATION TO FAVICON**",
        page:"**DEFAULT PAGE**",
        args:"**ANY ARGUMENTS YOU WANT TO PASS**",
        app_version:1.0,
        alert_count:30
    })};

```

## Authors

* **Ryan W** - *Initial work* - [AspyTheAussie](https://github.com/AspyTheAussie)

See also the list of [contributors](https://github.com/stelch/appify/contributors) who participated in this project.

## License

- see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* This software is still in early Alpha
