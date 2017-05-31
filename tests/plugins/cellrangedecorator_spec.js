(function ($) {

  var grid,         // The SlickGrid instance
    cols = [      // The column definitions
      {name: "Header", field: "header", width: 100},
      {name: "Another Header", field: "another-header", width: 100},
      {name: "Yet another header", field: "y-a-header", width: 100},
    ],
    data = [], // The grid data
    $container = $("#container");

  var $canvas, dragRangeContainer, cellSelector, cellDecorator;

  // Create data
  for (var i = 0; i < 10; i++) {
    data.push({
      "id": "row" + i,
      "header": "some data",
      "another-header": "more data",
      "y-a-header": "data data"
    });
  }

  function setupGrid() {
    var $testgrid = $('<div id="grid" />');
    $testgrid.height(600);

    $("#container").append($testgrid);
    grid = new Slick.Grid("#grid", data, cols);
    cellDecorator = new Slick.CellRangeDecorator(grid, {
      offset: {
        top: 1,
        left: 1,
        height: 1,
        bottom: 1
      }
    });
    cellSelector = new Slick.CellRangeSelector({cellDecorator: cellDecorator});
    grid.setSelectionModel(new Slick.CellSelectionModel({cellRangeSelector: cellSelector}));
    grid.render();
    $canvas = $(".grid-canvas");
  }

  function teardownGrid() {
    $container.empty();
  }

  function getCell(row, column) {
    return $($("#grid .slick-cell.l" + column)[row]);
  }

  module("plugins - cellrangemodel receives a prebuilt decorator -", {
    setup: function () {
      setupGrid({});
    },
    teardown: teardownGrid
  });

  test("check the values passed on options are used", function () {
    var element = cellDecorator.show(new Slick.Range(1, 1, 2, 2));
    var resultCss = element.currentStyle();

    var expectedCss = {

    };
    deepEqual(expectedCss, resultCss, "Element CSS");
  });


})(jQuery);