# HTML Input Types

* text
* email
* number
* tel
* password
* radio
* checkbox
* date
* url
* search
* textarea

## Params

```

{
    name: "",
    type: "required", || "nullable"
    size: 255,
    minlength: 0,
    maxlength: 255,
    min: 0,
    max: 255,
    from: 2022-03-02,
    to: 2022-03-03,
    emailOnly: false, || true
    numericOnly: false, || true
    specialCharacters: true, || false
    pattern: /^([a-z0-9]{5,})$/
}

```