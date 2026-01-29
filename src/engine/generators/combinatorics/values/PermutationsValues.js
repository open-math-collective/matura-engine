const MathUtils = require("../../../utils/MathUtils");

class PermutationsValues {
  /**
   * Parameters for queue problem (n! or P(n,k) permutations)
   * Returns: { nRange, scenarios, usePartial }
   */
  static getQueueProblemParams(difficulty) {
    if (difficulty === "easy") {
      return {
        nRange: [3, 6],
        scenarios: ["queue", "shelf", "row", "line"],
        usePartial: false,
      };
    } else if (difficulty === "hard") {
      return {
        nRange: [5, 500],
        scenarios: [
          "queue",
          "shelf",
          "row",
          "line",
          "circle",
          "photo",
          "podium",
          "seats",
          "stations",
          "order",
          "arrangement",
          "tournament",
        ],
        usePartial: true,
      };
    } else {
      return {
        nRange: [4, 8],
        scenarios: ["queue", "shelf", "row", "line", "photo"],
        usePartial: false,
      };
    }
  }

  /**
   * Parameters for flag problem (permutations with/without repetition)
   * Returns: { kRange, stripeCounts, repetitionOptions }
   */
  static getFlagProblemParams(difficulty) {
    if (difficulty === "easy") {
      return {
        kRange: [3, 6], // colors available
        stripeCounts: [2, 3], // stripes on flag
        repetitionOptions: [false],
      };
    } else if (difficulty === "hard") {
      return {
        kRange: [2, 100000],
        stripeCounts: [2, 3, 4, 5, 6, 7],
        repetitionOptions: [true, false],
      };
    } else {
      return {
        kRange: [4, 10],
        stripeCounts: [3, 4],
        repetitionOptions: [true, false],
      };
    }
  }

  /**
   * Parameters for seating constraint problems
   * Returns: { nRange, constraintTypes }
   */
  static getSeatingConstraintParams(difficulty) {
    if (difficulty === "easy") {
      return {
        nRange: [3, 5],
        constraintTypes: ["together", "fixed_first", "apart"],
        personNames: [
          "Ania",
          "Kasia",
          "Tomek",
          "Piotr",
          "Marek",
          "Ola",
          "Basia",
          "Janek",
        ],
      };
    } else if (difficulty === "hard") {
      return {
        nRange: [6, 10],
        constraintTypes: [
          "together",
          "fixed_first",
          "fixed_position",
          "apart",
          "ends",
          "together_three",
        ],
        personNames: [
          "Ania",
          "Kasia",
          "Tomek",
          "Piotr",
          "Marek",
          "Ola",
          "Basia",
          "Janek",
          "Zosia",
          "Krzysiek",
          "Magda",
          "Łukasz",
        ],
      };
    } else {
      return {
        nRange: [4, 7],
        constraintTypes: ["together", "fixed_first", "apart", "ends"],
        personNames: [
          "Ania",
          "Kasia",
          "Tomek",
          "Piotr",
          "Marek",
          "Ola",
          "Basia",
          "Janek",
          "Zosia",
        ],
      };
    }
  }

  /**
   * Get templates for queue problem
   */
  static getQueueTemplates(scenario, n) {
    const templates = {
      queue: [
        `Na ile sposobów $$${n}$$ osób może ustawić się w kolejce do kasy?`,
        `Ile różnych kolejności ustawienia w kolejce może przyjąć $$${n}$$ osób?`,
        `W sklepie $$${n}$$ klientów czeka do kasy. Na ile sposobów mogą się ustawić?`,
        `Na ile sposobów $$${n}$$ osób może ustawić się w kolejce po bilety?`,
        `W urzędzie czeka $$${n}$$ osób. Na ile sposobów mogą stać w kolejce?`,
        `Na ile sposobów można ustawić w kolejce $$${n}$$ uczniów?`,
        `W poczekalni jest $$${n}$$ pacjentów. Na ile sposobów mogą się ustawić do lekarza?`,
        `Na ile sposobów $$${n}$$ zawodników może ustawić się na starcie wyścigu?`,
        `W banku czeka $$${n}$$ klientów. Na ile sposobów mogą stać w kolejce?`,
        `Na ile sposobów $$${n}$$ osób może wejść do windy w kolejności?`,
        `W kasie biletowej stoi $$${n}$$ turystów. Na ile sposobów mogą kupić bilety?`,
        `Na ile sposobów $$${n}$$ kierowców może wjechać na parking po kolei?`,
        `W kolejce do autobusu stoi $$${n}$$ osób. Na ile sposobów mogą wsiąść?`,
        `Na ile sposobów $$${n}$$ graczy może dołączyć do gry w kolejności?`,
        `W kolejce do bufetu stoi $$${n}$$ osób. Na ile sposobów mogą się ustawić?`,
        `Na ile sposobów $$${n}$$ klientów może obsłużyć kelner w restauracji?`,
        `W aptece czeka $$${n}$$ klientów. Na ile sposobów mogą stać w kolejce?`,
        `Na ile sposobów $$${n}$$ osób może wsiąść do rollercoastera po kolei?`,
        `W kolejce do kina stoi $$${n}$$ widzów. Na ile sposobów mogą kupić bilety?`,
        `Na ile sposobów $$${n}$$ pasażerów może wsiąść do samolotu po kolei?`,
        `W poczekalni dentysty siedzi $$${n}$$ pacjentów. Na ile sposobów mogą wejść?`,
        `Na ile sposobów $$${n}$$ uczestników może zarejestrować się na konferencji?`,
        `W kolejce do muzeum stoi $$${n}$$ turystów. Na ile sposobów mogą wejść?`,
        `Na ile sposobów $$${n}$$ klientów może zamówić w food trucku?`,
        `W kolejce do teatru czeka $$${n}$$ widzów. Na ile sposobów mogą kupić bilety?`,
        `Na ile sposobów $$${n}$$ graczy może zalogować się do systemu?`,
        `W kolejce do zoo stoi $$${n}$$ rodzin. Na ile sposobów mogą wejść?`,
        `Na ile sposobów $$${n}$$ kierowców może przejechać przez bramkę?`,
        `W kolejce do basenu czeka $$${n}$$ osób. Na ile sposobów mogą wejść?`,
        `Na ile sposobów $$${n}$$ uczniów może odebrać świadectwa po kolei?`,
        `W kolejce na autografy stoi $$${n}$$ fanów. Na ile sposobów mogą podejść?`,
        `Na ile sposobów $$${n}$$ klientów może skorzystać z toalety publicznej?`,
        `W kolejce do trampolin czeka $$${n}$$ dzieci. Na ile sposobów mogą skakać?`,
        `Na ile sposobów $$${n}$$ osób może odebrać przesyłkę z poczty?`,
        `W kolejce do gokartów stoi $$${n}$$ kierowców. Na ile sposobów mogą jeździć?`,
        `Na ile sposobów $$${n}$$ klientów może zamówić kawę w kawiarni?`,
        `W kolejce na kręgle czeka $$${n}$$ graczy. Na ile sposobów mogą grać?`,
        `Na ile sposobów $$${n}$$ uczestników może przejść przez kontrolę bezpieczeństwa?`,
        `W kolejce do escape roomu stoi $$${n}$$ grup. Na ile sposobów mogą zacząć?`,
        `Na ile sposobów $$${n}$$ rodziców może odebrać dzieci z przedszkola?`,
        `W kolejce do sauny czeka $$${n}$$ osób. Na ile sposobów mogą wejść?`,
        `Na ile sposobów $$${n}$$ graczy może dołączyć do turnieju szachowego?`,
        `W kolejce na lodowisko stoi $$${n}$$ łyżwiarzy. Na ile sposobów mogą wejść?`,
        `Na ile sposobów $$${n}$$ klientów może złożyć zamówienie w piekarni?`,
        `W kolejce do kawiarni czeka $$${n}$$ studentów. Na ile sposobów mogą zamówić?`,
        `Na ile sposobów $$${n}$$ osób może wsiąść do kolejki górskiej?`,
        `W kolejce do symulatora lotu stoi $$${n}$$ osób. Na ile sposobów mogą latać?`,
        `Na ile sposobów $$${n}$$ uczestników może wziąć udział w konkursie?`,
        `W kolejce do kasyna czeka $$${n}$$ graczy. Na ile sposobów mogą wejść?`,
        `Na ile sposobów $$${n}$$ turystów może wjechać kolejką linową?`,
        `W kolejce do salonu samochodowego stoi $$${n}$$ klientów. Na ile sposobów?`,
        `Na ile sposobów $$${n}$$ dzieci może przejść przez labirynt?`,
        `W kolejce na bungee czeka $$${n}$$ odważnych. Na ile sposobów mogą skakać?`,
        `Na ile sposobów $$${n}$$ osób może zarejestrować się w hotelu?`,
        `W kolejce do salonu piękności czeka $$${n}$$ klientek. Na ile sposobów?`,
        `Na ile sposobów $$${n}$$ kierowców może zatankować na stacji benzynowej?`,
        `W kolejce do sklepu z pamiątkami stoi $$${n}$$ turystów. Na ile sposobów?`,
        `Na ile sposobów $$${n}$$ osób może odebrać nagrodę w loterii?`,
        `W kolejce do fotobudki czeka $$${n}$$ par. Na ile sposobów mogą robić zdjęcia?`,
        `Na ile sposobów $$${n}$$ uczestników może zgłosić się do biura podróży?`,
      ],
      shelf: [
        `Na ile sposobów można ustawić $$${n}$$ książek na półce?`,
        `Mamy $$${n}$$ różnych książek. Na ile sposobów można je ułożyć na półce?`,
        `Ile różnych układów $$${n}$$ tomów można zrobić na półce?`,
        `Na ile sposobów można poukładać $$${n}$$ albumów na półce?`,
        `Na półce mamy $$${n}$$ różnych przedmiotów. Na ile sposobów można je ustawić?`,
        `Na ile sposobów można ułożyć $$${n}$$ pudełek na półce?`,
        `Ile permutacji $$${n}$$ elementów można uzyskać na półce?`,
        `Na ile sposobów można poukładać $$${n}$$ butelek na półce?`,
        `Mamy $$${n}$$ różnych figurek. Na ile sposobów można je ustawić na półce?`,
        `Na ile sposobów można ułożyć $$${n}$$ płyt CD na półce?`,
        `Na półce chcemy ustawić $$${n}$$ trofeów. Na ile sposobów można to zrobić?`,
      ],
      row: [
        `Na ile sposobów $$${n}$$ osób może usiąść w jednym rzędzie?`,
        `W teatrze jest rząd z $$${n}$$ miejscami. Na ile sposobów można na nich usiąść?`,
        `Ile możliwych ustawień w rzędzie ma $$${n}$$ uczestników?`,
        `Na ile sposobów $$${n}$$ studentów może usiąść w ławce?`,
        `W kinie jest rząd z $$${n}$$ fotelniki. Na ile sposobów mogą usiąść widzowie?`,
        `Na ile sposobów można posadzić w rzędzie $$${n}$$ dzieci?`,
        `W auli jest rząd z $$${n}$$ krzesłami. Na ile sposobów mogą usiąść goście?`,
        `Na ile sposobów $$${n}$$ zawodników może stanąć na linii startu?`,
        `Na stadionie jest rząd z $$${n}$$ miejscami. Na ile sposobów mogą usiąść kibice?`,
      ],
      line: [
        `Na ile sposobów $$${n}$$ żołnierzy może ustawić się w szeregu?`,
        `Ile różnych ustawień w szeregu może przyjąć $$${n}$$ osób?`,
        `Na ile sposobów $$${n}$$ uczestników defilady może maszerować w szeregu?`,
        `Na ile sposobów można ustawić w linii $$${n}$$ przedmiotów?`,
        `Ile permutacji w szeregu można utworzyć z $$${n}$$ elementów?`,
        `Na ile sposobów $$${n}$$ pątników może maszerować w pochodzie?`,
        `W korowodzie bierze udział $$${n}$$ osób. Na ile sposobów mogą się ustawić?`,
      ],
      circle: [
        `Na ile sposobów $$${n}$$ osób może usiąść przy okrągłym stole?`,
        `Ile różnych ustawień w okręgu może przyjąć $$${n}$$ osób?`,
        `Na ile sposobów można posadzić $$${n}$$ gości przy okrągłym stole?`,
        `Wokół ogniska siedzi $$${n}$$ harcerzy. Na ile sposobów mogą się ustawić?`,
        `Przy okrągłym stole zasiada $$${n}$$ osób. Na ile sposobów?`,
        `Wokół kominka siedzi $$${n}$$ członków rodziny. Na ile sposobów mogą usiąść?`,
        `Na ile sposobów $$${n}$$ dyplomatów może zasiąść przy okrągłym stole negocjacyjnym?`,
        `Wokół stolu konferencyjnego zasiada $$${n}$$ prezesów. Na ile sposobów?`,
        `Na ile sposobów $$${n}$$ dzieci może usiąść wokół choinki?`,
      ],
      photo: [
        `Na ile sposobów $$${n}$$ osób może ustawić się do zdjęcia grupowego?`,
        `Ile różnych układów na zdjęciu może przyjąć grupa $$${n}$$ osób?`,
        `Na ile sposobów $$${n}$$ przyjaciół może stanąć do pamiątkowego zdjęcia?`,
        `Fotograf robi zdjęcie $$${n}$$ osobom. Na ile sposobów mogą się ustawić?`,
        `Na ile sposobów klasa z $$${n}$$ uczniami może stanąć do zdjęcia?`,
        `Na ile sposobów drużyna $$${n}$$ zawodników może stanąć do zdjęcia?`,
        `Chcemy sfotografować $$${n}$$ osób. Na ile sposobów mogą się ustawić?`,
        `Na ile sposobów zespół $$${n}$$ muzyków może stanąć do zdjęcia?`,
      ],
      podium: [
        `Na ile sposobów $$${n}$$ zawodników może zająć miejsca na podium?`,
        `W zawodach bierze udział $$${n}$$ sportowców. Na ile sposobów mogą stanąć na podium?`,
        `Ile różnych wyników podium możliwych jest przy $$${n}$$ zawodnikach?`,
        `Na ile sposobów $$${n}$$ biegaczy może ukończyć bieg (rozróżniamy miejsca)?`,
        `Przy $$${n}$$ uczestnikach, na ile sposobów mogą zająć pierwsze trzy miejsca?`,
      ],
      seats: [
        `Na ile sposobów $$${n}$$ pasażerów może zająć miejsca w samochodzie?`,
        `W pociągu jest $$${n}$$ wolnych miejsc. Na ile sposobów mogą je zająć podróżni?`,
        `Na ile sposobów $$${n}$$ osób może usiąść w autobusie na wolnych miejscach?`,
        `W samolocie czeka $$${n}$$ pasażerów na przydział miejsc. Na ile sposobów?`,
        `Na ile sposobów $$${n}$$ gości może zająć miejsca przy stole?`,
      ],
      stations: [
        `Na ile sposobów $$${n}$$ pociągów może odjechać z dworca w kolejności?`,
        `W porcie jest $$${n}$$ statków. Na ile sposobów mogą wypłynąć po kolei?`,
        `Na lotnisku czeka $$${n}$$ samolotów do startu. Na ile sposobów mogą wystartować?`,
        `Na ile sposobów $$${n}$$ autobusów może odjechać z zajezdni?`,
      ],
      arrangement: [
        `Na ile sposobów można wybrać i ustawić 3 osoby z $$${n}$$ do komisji?`,
        `Z grupy $$${n}$$ osób wybieramy 4 i ustawiamy w kolejności. Na ile sposobów?`,
        `Na ile sposobów można wybrać i ustawić 2 osoby z $$${n}$$ na stanowiska?`,
        `Wybieramy 5 osób z $$${n}$$ i przydzielamy im miejsca. Na ile sposobów?`,
        `Na ile sposobów można wybrać 3 osoby z $$${n}$$ i ustalić ich kolejność?`,
      ],
      tournament: [
        `Na ile sposobów $$${n}$$ zawodników może zająć pierwsze 3 miejsca?`,
        `W turnieju bierze udział $$${n}$$ graczy. Na ile sposobów mogą zająć podium?`,
        `Na ile sposobów $$${n}$$ biegaczy może ukończyć bieg na pierwszych 4 pozycjach?`,
        `W zawodach jest $$${n}$$ uczestników. Na ile sposobów mogą zająć czołowe 3 miejsca?`,
        `Na ile sposobów $$${n}$$ drużyn może zająć pierwsze 2 miejsca w lidze?`,
      ],
      order: [
        `Na ile sposobów można ustalić kolejność $$${n}$$ zadań do wykonania?`,
        `Mamy $$${n}$$ czynności do wykonania. Na ile sposobów można je zaplanować?`,
        `Na ile sposobów można ustalić priorytet $$${n}$$ projektów?`,
        `W harmonogramie jest $$${n}$$ punktów. Na ile sposobów można je ułożyć?`,
        `Na ile sposobów można ustalić kolejność $$${n}$$ etapów zawodów?`,
      ],
    };

    const scenarioTemplates = templates[scenario] || templates["queue"];
    return MathUtils.randomElement(scenarioTemplates);
  }

  /**
   * Get templates for flag problem
   */
  static getFlagTemplates(k, stripeCount, distinct) {
    const repetitionText = distinct
      ? "nie mogą się powtarzać"
      : "mogą się powtarzać";

    const templates = {
      2: [
        `Mamy do dyspozycji $$${k}$$ kolorów materiału. Szyjemy flagę z dwóch poziomych pasów jednakowej szerokości. Ile różnych flag można uszyć, jeśli kolory pasów ${repetitionText}?`,
        `Dostępne są $$${k}$$ różne tkaniny. Flaga składa się z dwóch pasów. Ile różnych flag można uszyć, zakładając że kolory ${repetitionText}?`,
        `Na ile sposobów można pomalować flagę z dwoma pasami, mając $$${k}$$ kolorów, jeśli kolory ${repetitionText}?`,
        `Producent flag ma $$${k}$$ kolorów. Flaga dwupasmowa. Ile wzorów jeśli kolory ${repetitionText}?`,
        `Na ile sposobów można pokolorować baner z dwoma pasami mając $$${k}$$ kolorów, jeśli ${repetitionText}?`,
        `Na ile sposobów można uszyć flagę z dwoma poziomymi pasami z $$${k}$$ kolorów, jeśli ${repetitionText}?`,
        `Zakład tekstylny ma $$${k}$$ barw. Na ile sposobów można wykonać flagę dwupasmową jeśli ${repetitionText}?`,
        `Flaga składa się z 2 pasów. Dostępnych jest $$${k}$$ kolorów. Ile wzorów jeśli ${repetitionText}?`,
      ],
      3: [
        `Mamy do dyspozycji $$${k}$$ kolorów materiału. Szyjemy flagę z trzech poziomych pasów jednakowej szerokości. Ile różnych flag można uszyć, jeśli kolory pasów ${repetitionText}?`,
        `Dostępne są $$${k}$$ różne tkaniny. Flaga składa się z trzech pasów. Ile różnych flag można uszyć, zakładając że kolory ${repetitionText}?`,
        `Na ile sposobów można pomalować flagę z trzema pasami, mając $$${k}$$ kolorów, jeśli kolory ${repetitionText}?`,
        `Producent flag ma $$${k}$$ kolorów. Flaga ma trzy poziome pasy. Ile różnych wzorów może stworzyć, jeśli kolory ${repetitionText}?`,
        `Na ile sposobów można uszyć trójpasmową flagę z $$${k}$$ kolorów, jeśli ${repetitionText}?`,
        `Zakład ma $$${k}$$ kolorów na flagę trójpasmową. Ile wzorów jeśli ${repetitionText}?`,
        `Na ile sposobów można wykonać flagę z 3 pasami z $$${k}$$ barw, jeśli ${repetitionText}?`,
        `Flaga trójkolorowa z $$${k}$$ dostępnych barw. Ile wzorów jeśli ${repetitionText}?`,
      ],
      4: [
        `Mamy do dyspozycji $$${k}$$ kolorów materiału. Szyjemy flagę z czterech poziomych pasów jednakowej szerokości. Ile różnych flag można uszyć, jeśli kolory pasów ${repetitionText}?`,
        `Dostępne są $$${k}$$ różne tkaniny. Flaga składa się z czterech pasów. Ile różnych flag można uszyć, zakładając że kolory ${repetitionText}?`,
        `Na ile sposobów można pomalować flagę z czterema pasami, mając $$${k}$$ kolorów, jeśli kolory ${repetitionText}?`,
        `Flaga czteropasmowa, dostępne $$${k}$$ kolory. Ile wzorów jeśli kolory ${repetitionText}?`,
        `Na ile sposobów można wykonać flagę z czterema poziomymi pasami z $$${k}$$ kolorów, jeśli ${repetitionText}?`,
        `Zakład tekstylny produkuje flagi czteropasmowe z $$${k}$$ barw. Ile możliwych wzorów jeśli ${repetitionText}?`,
        `Na ile sposobów można uszyć flagę czteropasmową z $$${k}$$ kolorów, jeśli ${repetitionText}?`,
        `Flaga z 4 pasami z $$${k}$$ dostępnych barw. Ile wzorów jeśli ${repetitionText}?`,
      ],
      5: [
        `Mamy do dyspozycji $$${k}$$ kolorów materiału. Szyjemy flagę z pięciu poziomych pasów jednakowej szerokości. Ile różnych flag można uszyć, jeśli kolory pasów ${repetitionText}?`,
        `Dostępne są $$${k}$$ różne tkaniny. Flaga pięciopasmowa. Ile różnych flag można uszyć, jeśli kolory ${repetitionText}?`,
        `Na ile sposobów można ustawić 5 pionowych słupków mając $$${k}$$ kolorów, jeśli kolory ${repetitionText}?`,
        `Na ile sposobów można wykonać pięciopasmową flagę z $$${k}$$ kolorów, jeśli ${repetitionText}?`,
        `Producent ma $$${k}$$ kolorów do wykonania flagi pięciopasmowej. Ile wzorów jeśli ${repetitionText}?`,
        `Flaga z 5 pasami z $$${k}$$ dostępnych barw. Ile wzorów jeśli ${repetitionText}?`,
        `Na ile sposobów można uszyć pięciopasmową flagę z $$${k}$$ kolorów, jeśli ${repetitionText}?`,
      ],
      6: [
        `Mamy do dyspozycji $$${k}$$ kolorów materiału. Szyjemy flagę z sześciu poziomych pasów. Ile różnych flag można uszyć, jeśli kolory pasów ${repetitionText}?`,
        `Dostępne są $$${k}$$ tkaniny. Flaga sześciopasmowa. Ile flag można uszyć jeśli kolory ${repetitionText}?`,
        `Na ile sposobów można pokolorować sześciopasmową flagę z $$${k}$$ kolorów, jeśli ${repetitionText}?`,
        `Zakład produkuje flagi sześciopasmowe z $$${k}$$ barw. Ile wzorów jeśli ${repetitionText}?`,
        `Flaga z 6 pasami z $$${k}$$ dostępnych barw. Ile wzorów jeśli ${repetitionText}?`,
        `Na ile sposobów można uszyć sześciopasmową flagę z $$${k}$$ kolorów, jeśli ${repetitionText}?`,
      ],
      7: [
        `Mamy do dyspozycji $$${k}$$ kolorów. Szyjemy flagę z siedmiu poziomych pasów. Ile różnych flag można uszyć, jeśli kolory ${repetitionText}?`,
        `Dostępne są $$${k}$$ tkaniny. Flaga siedmiopasmowa. Ile flag jeśli kolory ${repetitionText}?`,
        `Na ile sposobów można pokolorować flagę z siedmioma pasami z $$${k}$$ kolorów, jeśli ${repetitionText}?`,
        `Producent ma $$${k}$$ barw na flagę siedmiopasmową. Ile wzorów jeśli ${repetitionText}?`,
        `Na ile sposobów można uszyć siedmiopasmową flagę z $$${k}$$ kolorów, jeśli ${repetitionText}?`,
        `Flaga z siedmioma poziomymi pasami z $$${k}$$ kolorów. Ile możliwych wzorów jeśli ${repetitionText}?`,
        `Zakład tekstylny szyje flagi siedmiopasmowe z $$${k}$$ barw. Ile wzorów jeśli ${repetitionText}?`,
        `Na ile sposobów można pomalować siedmiopasmową flagę mając $$${k}$$ kolorów, jeśli ${repetitionText}?`,
        `Ile różnych flag siedmiopasmowych można uszyć z $$${k}$$ kolorów, jeśli ${repetitionText}?`,
        `Dostępnych jest $$${k}$$ kolorów na flagę z 7 pasami. Ile wzorów jeśli ${repetitionText}?`,
        `Na ile sposobów można wykonać flagę z siedmioma pasami z $$${k}$$ materiałów, jeśli ${repetitionText}?`,
        `Producent flag ma $$${k}$$ kolorów do wykonania flagi 7-pasmowej. Ile wzorów jeśli ${repetitionText}?`,
      ],
    };

    const countTemplates = templates[stripeCount] || templates[3];
    return MathUtils.randomElement(countTemplates);
  }

  /**
   * Get templates for seating constraint problems
   */
  static getSeatingConstraintTemplates(type, n, name1, name2, name3) {
    const templates = {
      together: [
        `Na ile sposobów $$${n}$$ osób (w tym ${name1} i ${name2}) może usiąść w rzędzie tak, aby ${name1} i ${name2} siedzieli obok siebie?`,
        `W grupie $$${n}$$ osób są ${name1} i ${name2}, którzy chcą siedzieć razem. Na ile sposobów można ich posadzić w rzędzie?`,
        `Na ile sposobów można ustawić w kolejce $$${n}$$ osób tak, aby ${name1} i ${name2} stali obok siebie?`,
        `${name1} i ${name2} chcą siedzieć razem w rzędzie $$${n}$$ miejsc. Na ile sposobów można posadzić wszystkich?`,
        `Na ile sposobów $$${n}$$ uczniów (w tym ${name1} i ${name2}) może usiąść w ławce obok siebie?`,
        `W teatrze $$${n}$$ osób, ${name1} i ${name2} muszą siedzieć obok siebie. Na ile sposobów?`,
      ],
      fixed_first: [
        `Na ile sposobów $$${n}$$ osób może ustawić się w kolejce, jeśli ${name1} musi stać na pierwszym miejscu?`,
        `W grupie $$${n}$$ osób ${name1} musi być pierwszy w kolejce. Na ile sposobów można ustawić resztę?`,
        `Na ile sposobów można posadzić $$${n}$$ osób w rzędzie, jeśli ${name1} musi siedzieć z lewej strony?`,
        `${name1} musi stać na początku szeregu $$${n}$$ osób. Na ile sposobów mogą się ustawić?`,
        `Na ile sposobów $$${n}$$ zawodników może ustawić się na starcie, jeśli ${name1} ma pierwszy numer?`,
        `W kolejce $$${n}$$ osób, ${name1} musi być pierwszy. Ile możliwych ustawień?`,
      ],
      fixed_position: [
        `Na ile sposobów $$${n}$$ osób może usiąść w rzędzie, jeśli ${name1} musi zająć środkowe miejsce?`,
        `W grupie $$${n}$$ osób ${name1} musi siedzieć dokładnie w środku. Na ile sposobów?`,
        `Na ile sposobów można ustawić $$${n}$$ osób, jeśli ${name1} musi być na pozycji $$${Math.floor(n / 2) + 1}$$?`,
        `${name1} musi zająć konkretne miejsce w rzędzie $$${n}$$ osób. Na ile sposobów reszta może się ustawić?`,
      ],
      apart: [
        `Na ile sposobów $$${n}$$ osób może usiąść w rzędzie tak, aby ${name1} i ${name2} nie siedzieli obok siebie?`,
        `W grupie $$${n}$$ osób ${name1} i ${name2} nie mogą siedzieć razem. Na ile sposobów można ich posadzić?`,
        `Na ile sposobów można ustawić w kolejce $$${n}$$ osób, jeśli ${name1} i ${name2} nie mogą stać obok siebie?`,
        `Ile ustawień w rzędzie $$${n}$$ osób jest możliwych, gdy ${name1} i ${name2} muszą być rozdzieleni?`,
        `Na ile sposobów $$${n}$$ uczniów może usiąść w ławce, aby ${name1} i ${name2} nie siedzieli obok siebie?`,
      ],
      ends: [
        `Na ile sposobów $$${n}$$ osób może usiąść w rzędzie tak, aby ${name1} i ${name2} siedzieli na krańcach?`,
        `W grupie $$${n}$$ osób ${name1} i ${name2} muszą siedzieć na skrajnych miejscach. Na ile sposobów?`,
        `Na ile sposobów można posadzić $$${n}$$ osób, jeśli ${name1} i ${name2} muszą być na końcach rzędu?`,
        `${name1} i ${name2} chcą siedzieć na skrajnych miejscach w rzędzie $$${n}$$ osób. Na ile sposobów?`,
      ],
      together_three: [
        `Na ile sposobów $$${n}$$ osób może usiąść w rzędzie tak, aby ${name1}, ${name2} i ${name3} siedzieli obok siebie?`,
        `W grupie $$${n}$$ osób trójka (${name1}, ${name2}, ${name3}) musi siedzieć razem. Na ile sposobów?`,
        `Na ile sposobów można ustawić $$${n}$$ osób, jeśli ${name1}, ${name2} i ${name3} muszą być obok siebie?`,
        `Trójka przyjaciół (${name1}, ${name2}, ${name3}) chce siedzieć razem w rzędzie $$${n}$$ miejsc. Na ile sposobów?`,
      ],
    };

    const typeTemplates = templates[type] || templates["together"];
    return MathUtils.randomElement(typeTemplates);
  }

  /**
   * Calculate factorial
   */
  static factorial(n) {
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  }

  /**
   * Calculate permutations without repetition: P(n,k) = n!/(n-k)!
   */
  static permutation(n, k) {
    let res = 1;
    for (let i = 0; i < k; i++) {
      res *= n - i;
    }
    return res;
  }

  /**
   * Calculate circular permutations: (n-1)!
   */
  static circularPermutation(n) {
    return this.factorial(n - 1);
  }

  /**
   * Get templates for partial permutation problems
   */
  static getPartialPermutationTemplates(type, n, k) {
    const templates = {
      arrangement: [
        `Na ile sposobów można wybrać i ustawić ${k} osoby z $$${n}$$ do komisji?`,
        `Z grupy $$${n}$$ osób wybieramy ${k} i ustawiamy w kolejności. Na ile sposobów?`,
        `Na ile sposobów można przydzielić ${k} stanowisk spośród $$${n}$$ kandydatów?`,
        `Wybieramy ${k} osób z $$${n}$$ i przydzielamy im miejsca. Na ile sposobów?`,
        `Na ile sposobów można wybrać ${k} osoby z $$${n}$$ i ustalić ich kolejność?`,
        `Z $$${n}$$ pracowników wybieramy ${k} do zespołu i ustalamy hierarchię. Na ile sposobów?`,
        `Na ile sposobów można przydzielić ${k} różnych zadań $$${n}$$ osobom?`,
        `Z grupy $$${n}$$ studentów wybieramy ${k} do reprezentacji z kolejnością. Na ile sposobów?`,
      ],
      tournament: [
        `Na ile sposobów $$${n}$$ zawodników może zająć pierwsze ${k} miejsca?`,
        `W turnieju bierze udział $$${n}$$ graczy. Na ile sposobów mogą zająć czołowe ${k} pozycje?`,
        `Na ile sposobów $$${n}$$ biegaczy może ukończyć bieg na pierwszych ${k} miejscach?`,
        `W zawodach jest $$${n}$$ uczestników. Na ile sposobów mogą zająć pierwsze ${k} miejsca?`,
        `Na ile sposobów $$${n}$$ drużyn może zająć pierwsze ${k} miejsca w lidze?`,
        `W maratonie startuje $$${n}$$ biegaczy. Na ile sposobów mogą przybiec na ${k} pierwszych miejscach?`,
        `Na ile sposobów $$${n}$$ pływaków może zająć ${k} pierwsze podium?`,
        `W wyścigu kolarskim startuje $$${n}$$ zawodników. Na ile sposobów mogą przyjechać w pierwszej ${k}?`,
      ],
      podium: [
        `Na ile sposobów $$${n}$$ zawodników może zająć podium (pierwsze ${k} miejsca)?`,
        `W zawodach sportowych startuje $$${n}$$ uczestników. Na ile sposobów mogą stanąć na ${k} miejscach podium?`,
        `Na ile sposobów $$${n}$$ graczy może zająć pierwsze ${k} lokaty?`,
        `W biegu ulicznym startuje $$${n}$$ osób. Na ile sposobów mogą przybiec w pierwszej ${k}?`,
      ],
      seats: [
        `Na ile sposobów można usadzić ${k} osób z $$${n}$$ na pierwszych miejscach?`,
        `Z $$${n}$$ pasażerów wybieramy ${k} do pierwszej klasy z kolejnością. Na ile sposobów?`,
        `Na ile sposobów można przydzielić ${k} miejsc VIP spośród $$${n}$$ gości?`,
        `W samolocie jest ${k} miejsc biznesowych. Na ile sposobów można przydzielić je $$${n}$$ pasażerom?`,
      ],
      stations: [
        `Na ile sposobów ${k} pierwszych pociągów może odjechać ze $$${n}$$ na dworcu?`,
        `W porcie czeka $$${n}$$ statków. Na ile sposobów ${k} pierwszych może wypłynąć w kolejności?`,
        `Na lotnisku czeka $$${n}$$ samolotów. Na ile sposobów ${k} pierwszych może wystartować?`,
        `Na zajezdni czeka $$${n}$$ autobusów. Na ile sposobów ${k} pierwszych może odjechać?`,
      ],
      queue: [
        `Na ile sposobów można wybrać ${k} pierwszych osób z $$${n}$$ ustawionych w kolejce?`,
        `Z $$${n}$$ klientów w kolejce wybieramy ${k} do pierwszego stanowiska. Na ile sposobów?`,
        `Na ile sposobów ${k} pierwszych osób z $$${n}$$ może zostać obsłużonych?`,
        `W kolejce stoi $$${n}$$ osób. Na ile sposobów ${k} pierwszych może zająć miejsca?`,
      ],
      row: [
        `Na ile sposobów można usadzić ${k} osób z $$${n}$$ w pierwszym rzędzie?`,
        `Z $$${n}$$ widzów wybieramy ${k} do pierwszego rzędu. Na ile sposobów?`,
        `W teatrze jest $$${n}$$ chętnych. Na ile sposobów można wybrać ${k} do pierwszego rzędu?`,
        `Na ile sposobów ${k} osób z $$${n}$$ może zająć miejsca w pierwszym rzędzie?`,
      ],
      shelf: [
        `Na ile sposobów można ustawić ${k} książek z $$${n}$$ na półce?`,
        `Z $$${n}$$ książek wybieramy ${k} i ustawiamy na półce. Na ile sposobów?`,
        `Na ile sposobów można wybrać i ułożyć ${k} książek z $$${n}$$?`,
        `Na półce ma się zmieścić ${k} książek z $$${n}$$. Na ile sposobów można je ustawić?`,
      ],
      line: [
        `Na ile sposobów można ustawić w linii ${k} osób z $$${n}$$?`,
        `Z $$${n}$$ żołnierzy wybieramy ${k} do szeregu. Na ile sposobów?`,
        `Na ile sposobów ${k} osób z $$${n}$$ może maszerować w pierwszym szeregu?`,
        `Wybieramy ${k} osób z $$${n}$$ i ustawiamy w szeregu. Na ile sposobów?`,
      ],
      circle: [
        `Na ile sposobów można usadzić ${k} osób z $$${n}$$ przy okrągłym stole?`,
        `Z $$${n}$$ gości wybieramy ${k} przy stół okrągły. Na ile sposobów?`,
        `Na ile sposobów można wybrać ${k} osób z $$${n}$$ do siedzenia w okręgu?`,
        `Wybieramy ${k} harcerzy z $$${n}$$ do siedzenia wokół ogniska. Na ile sposobów?`,
      ],
      photo: [
        `Na ile sposobów można wybrać ${k} osób z $$${n}$$ do pierwszego rzędu na zdjęciu?`,
        `Z $$${n}$$ osób wybieramy ${k} do pierwszego rzędu zdjęcia. Na ile sposobów?`,
        `Na ile sposobów ${k} osób z $$${n}$$ może stanąć w pierwszym rzędzie do zdjęcia?`,
        `Wybieramy ${k} przyjaciół z $$${n}$$ do pierwszego rzędu na pamiątkowe zdjęcie. Na ile sposobów?`,
      ],
      order: [
        `Na ile sposobów można wybrać ${k} zadań z $$${n}$$ i ustalić ich kolejność?`,
        `Z $$${n}$$ czynności wybieramy ${k} i planujemy kolejność. Na ile sposobów?`,
        `Na ile sposobów można ustalić pierwsze ${k} etapów z $$${n}$$?`,
        `Wybieramy ${k} projektów z $$${n}$$ i ustalamy priorytet. Na ile sposobów?`,
      ],
    };

    const typeTemplates = templates[type] || templates["arrangement"];
    return MathUtils.randomElement(typeTemplates);
  }
}

module.exports = PermutationsValues;
