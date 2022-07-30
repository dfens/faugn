$(function () {
  var knownWords = [
    "AA", "AB", "BA", "CA", "DB"
  ];

  var mood = 0;

  var words = {
    "AA": "ja",
    "AB": "ty",
    "AD": "prawda",
    "AE": "kłamstwo",
    "AF": "kto",

    "BA": "być",
    "BB": "zniszczyć",
    "BC": "grać",
    "BD": "mieć",
    "BE": "pomóc",
    "BF": "otworzyć",

    "CA": "piękny",
    "CB": "zły",
    "CC": "dobry",

    "DA": "faugn",
    "DB": "człowiek",
    "DC": "przyjaciel",
    "DD": "wróg",
    "DE": "drzwi",
    "DF": "muzyka",

    "EA": "radość",
    "EB": "smutek",
    "EC": "strach",
    "ED": "harmonia",

    "FA": "omner",
    "FB": "vocare",
    "FC": "pulvere",
    "FD": "mans",
    "FG": "sever",

    "GA": "vecna",

  }

  var usedSentences = [];
  var sentences = {
    "ty być piękny": { mood: 1, response: "ty dobry" },
    "ty być dobry": { mood: 0, response: "ja radość zły vecna zniszczyć harmonia" },
    "ja faugn": { mood: 0, response: "kłamstwo" },
    "ty faugn": { mood: 0, response: "prawda kto ty" },
    "ty być faugn": { mood: 0, response: "prawda kto ty" },
    "ty być człowiek": { mood: 0, response: "kłamstwo" },
    "ja zniszczyć muzyka": { mood: -2, response: "ja strach" },
    "ja grać muzyka": { mood: 0, response: "ty zniszczyć vocare ty zniszczyć smutek" },
    "ja być człowiek": { mood: 0, response: "ja być faugn" },
    "ja człowiek": { mood: 0, response: "ja faugn ty pomóc" },
    "ja przyjaciel": { mood: 2, response: "ja mieć drzwi" },
    "ja być wróg": { mood: -2, response: "ja smutek" },
    "ja wróg": { mood: -1, response: "ja smutek" },
    "ty wróg": { mood: -2, response: "ja smutek" },
    "ty być wróg": { mood: -2, response: "ja smutek" },
    "ty dobry": { mood: 1, response: "ty sever" },
    "ja być dobry": { mood: 1, response: "ty zniszczyć vecna" },
    "muzyka grać": { mood: 1, response: "harmonia" },
    "ja pomóc": { mood: 1, response: "ty zniszczyć wróg" },
    "kto wróg": { mood: 0, response: "vecna" },
    "faugn być piękny": { mood: 1, response: "faugn grać muzyka" },
    "faugn piękny": { mood: 1, response: "faugn grać muzyka" },
    "faugn grać muzyka": { mood: 0, response: "prawda faugn grać harmonia" },
    "ja zniszczyć wróg": { mood: 3, response: "radość ty pomóc" },
    "vecna": { mood: -1, response: "strach strach strach" },
    "kto być vecna": { mood: 0, response: "zły vecna zniszczyć harmonia" },
    "strach": { mood: 0, response: "omner" },
    "omner": { mood: 0, response: "vocare" },
    "vocare mans": { mood: -1, response: "zły harmonia" },
    "vocare omner": { mood: -1, response: "zły harmonia" },
    "vocare pulvere": { mood: 5, response: "strach zły strach ja otworzyć drzwi" },
    "mans omner": { mood: 0, response: "ty otworzyć drzwi pulvere pulvere sever" },
    "sever": { mood: 0, response: "prawda dobry kłamstwo zły" },
    "vecna wróg": { mood: 0, response: "vecna zniszczyć harmonia" },
    "muzyka być piękny": { mood: 1, response: "vecna zniszczyć muzyka" },
    "człowiek grać muzyka": { mood: 1, response: "człowiek być przyjaciel" },
    "ja być przyjaciel": { mood: 1, response: "ja radość ja mieć drzwi" },
    "ty być przyjaciel": { mood: 1, response: "ja grać muzyka ja mieć drzwi" },
    "ty przyjaciel": { mood: 1, response: "ja grać radość ja mieć drzwi" },
    "ty przyjaciel": { mood: 1, response: "ja mieć drzwi" },
    "ja być piękny": { mood: 1, response: "ty pomóc grać muzyka" },
    "radość": { mood: 1, response: "człowiek dobry" },
    "ty otworzyć drzwi": { mood: 5, response: "dobry harmonia" },
    "ja zniszczyć vecna": { mood: 2, response: "ja otworzyć drzwi" },
    "ty pomóc": { mood: 0, response: "ty pomóc" },
    "ty grać piękny": { mood: 3, response: "ja radość harmonia sever mans" },
    "vecna być zły": { mood: 0, response: "prawda" },
    "faugn być dobry": { mood: 1, response: "faugn mieć przyjaciel" },
    "ty grać muzyka": { mood: 0, response: "muzyka być harmonia" },
    "muzyka być harmonia": { mood: 0, response: "vecna zniszczyć harmonia ty grać vocare" },
    "ja radość": { mood: 0, response: "ja strach vecna mieć vocare" },
    "kto ty": { mood: 0, response: "ja faugn" },
    "vecna być zły": { mood: 0, response: "vecna zniszczyć muzyka" },
    "ty mieć harmonia": { mood: 0, response: "mans omner sever" },
    "kłamstwo": { mood: 0, response: "zniszczyć harmonia" },
    "człowiek być przyjaciel": { mood: 0, response: "człowiek grać harmonia" },
    "człowiek być piękny": { mood: 0, response: "człowiek grać harmonia" },
    "muzyka mieć harmonia": { mood: 1, response: "prawda" },
    "kłamstwo być zły": { mood: 1, response: "kłamstwo zniszczyć harmonia" },
  }
  var submitResponse = function (response) {

  }

  var getOptions = function () {
    $(".buttons").html("");

    $.each(words, function (key, word) {
      var known = knownWords.includes(key);
      var content = key;
      if (known) content = key + "/" + word;

      var button = $("<a href='#' data-word='" + word + "' data-key='" + key + "' class='btn btn-lg btn-primary m-2'>" + content + "</a>");
      if (!known) button.addClass("btn-warning");
      $(".buttons").append(button);
    });
  }

  var currentSentence = "";

  var processCurrentSentence = function () {
    var anyMatched = false;
    $.each(sentences, function (sentence, result) {
      if (sentence == currentSentence) {
        var splittedSentence = sentence.split(" ");
        var div = $("<div style='font-weight:normal'>(" + result.mood + ") </div>");

        for (var i = 0; i < splittedSentence.length; i += 1) {
          var word = splittedSentence[i];
          var key = "";
          $.each(words, function (k, w) {
            if (word == w) key = k;
          });
          knownWords.push(key);

          div.append(
            word + "<span class='text-muted font-italic'>[" + key + "] </span>"
          );
        }
        $(".archive").append(
          div
        );
        currentSentence = "";
        var responseWords = result.response.split(" ");
        var div = $("<div style='border-bottom:1px dashed #567;padding-bottom: 5px;font-weight:bold'></div>");

        for (var i = 0; i < responseWords.length; i += 1) {
          var word = responseWords[i];
          var key = "";
          $.each(words, function (k, w) {
            if (word == w) key = k;
          });
          knownWords.push(key);
          div.append(
            word + "<span class='text-muted font-italic'>[" + key + "] </span>"
          );
        }
        $(".archive").append(div);

        $(".dialogue").html("");
        getOptions();

        if (!usedSentences.includes(sentence))
          mood += result.mood;
        usedSentences.push(sentence)
      }
      if (sentence.substring(0, currentSentence.length) == currentSentence)
        anyMatched = true;
    });
    if (!anyMatched) {
      $(".archive").append(
        $("<div style='background: #f99'>(-1)</div>").append($(".dialogue").html())
      );
      currentSentence = "";
      $(".dialogue").html("");
      mood -= 1;
    }
    $(".mood").removeClass("bg-danger").removeClass("bg-success");
    $(".mood").html(mood);
    if (mood < 0) $(".mood").addClass("bg-danger");
    if (mood > 0) $(".mood").addClass("bg-success");
  }

  $(".buttons").on("click", ".btn",
    function (e) {
      e.preventDefault();
      var word = $(this).data('word');
      var key = $(this).data('key');

      var sanitizedWord = word;
      if (!knownWords.includes(key)) sanitizedWord = "?"
      $(".dialogue").append(
        sanitizedWord + "<span class='text-muted font-italic'>[" + key + "] </span>"
      );
      if (currentSentence == "") currentSentence += word;
      else
        currentSentence += (" " + word);
      processCurrentSentence();
    }
  )

  getOptions();
});
