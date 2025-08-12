# ZBwebsiTe

React-based website for Zeta Beta Tau fraternity Xi Chapter at the Massachusetts Institute of Technology.
This website is designed to be super modular, with little to no code changes ever needed each year.

Just edit the data files and add new images and it's all good.

Prereqs:
- node (I am on `v.23.11.0` but there is a lot of flexibility here)
- yarn (I am on `1.22.22` but there is also flexiblity here)

##  HOW TO UPDATE THE SITE:

### New Rush Info
Update `src/data/rushData.json` in the following format:
```json
{
	"start_date": "mm/dd/yyyy",
	"end_date": "mm/dd/yyyy",
	"events": [
		{
			"name": str,
			"date": "mm/dd",
			"time": "hh:mm AM/PM - hh:mm AM/PM",
			"description": str,
			"location": str,
			"tags": ["food", "games", "excursion", "invite_only"]
		}
	]
}
```

You can save the old rush info if you want. Also the tags are variable, it'll capitalize and split on underscores.

### Adding new brothers
1. Update `src/data/brothersData.json`
Just add to the file, for maintenence you can delete old brothers if you want, but use this format for new ones:
```json
{
    "id": "first_last", # if there's overlap handle it with a number or smth
    "name": "First Last",
    "zbt_class": "beta xxx",
    "graduating_class": 20xx,
    "bio": "",
    "role": "",
    "rush_order": 1,
    "big": "", # of ids
    "littles": [""]
}
```

2. Update the `most_recent_class` field to be the newest class

3. Add brother images to `public/images/brothers/beta_xxx` in the following format:
`First Last.jpeg` -> **it is critical that the file extension is `.jpeg` spelled that way,** you can rename any image (even png) to that without conversion because all file readers will read the data given header specification anyways, but this is needed for the loading of the image to work. 

4. Clean up any old images if you want to delete them

### Editing images
Pretty self explanatory, the images are all in `public/images/<page>` and most are just numbered for the gallery, so just replace the filename exactly and your image will be updated. 

### Editing 