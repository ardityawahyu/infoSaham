define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./apidoc/main.js",
    "group": "D__Ardit_Works_briwebapi_apidoc_main_js",
    "groupTitle": "D__Ardit_Works_briwebapi_apidoc_main_js",
    "name": ""
  },
  {
    "type": "get",
    "url": "/api/v1/saham",
    "title": "Get Informasi saham",
    "name": "GetSaham",
    "group": "Saham",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "id",
            "description": "<p>Primary Key ID</p>"
          },
          {
            "group": "Success 200",
            "type": "int",
            "optional": false,
            "field": "date_time",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "last",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "plus_minus_persen",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "hight_low",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "open_close",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "decimal",
            "optional": false,
            "field": "volume",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Timestamp",
            "optional": false,
            "field": "updated",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/saham.js",
    "groupTitle": "Saham"
  }
] });
