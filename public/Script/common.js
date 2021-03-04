var user_id = null
var counter = null

var gCurrentPoint=1;

var mImgWidth = 800;
var mImgHeight = 600;
var mImgNaturalWidth = 800;
var mImgNaturalHeight = 600;



function OnClickImg(event,img) {
  var checkBox = document.getElementById("pwr");
  var enabled = checkBox.checked;
  if (!enabled) {
    return;
  }
  var img = document.getElementById("snapshot");

  var px = "px" + gCurrentPoint;
  var py = "py" + gCurrentPoint;
  gCurrentPoint = gCurrentPoint == 1? 2: 1;

  var posX = event.offsetX?(event.offsetX):event.pageX-img.offsetLeft;
  var posY = event.offsetY?(event.offsetY):event.pageY-img.offsetTop;

  document.getElementById(px).value = posX * 100 / mImgWidth;
  document.getElementById(py).value = posY * 100 / mImgHeight;

  DrawCanvas();
};

function DrawCanvas() {
  var canvas = document.getElementById("canvas");
  var context = document.getElementById("canvas").getContext("2d");
  var px1 = document.getElementById("px1").value;
  var py1 = document.getElementById("py1").value;
  var px2 = document.getElementById("px2").value;
  var py2 = document.getElementById("py2").value;

  if (px2 != "") {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.moveTo(px1 * canvas.width * 0.01, py1 * canvas.height * 0.01);
    context.lineTo(px2 * canvas.width * 0.01, py2 * canvas.height * 0.01);
    context.closePath();
    context.lineWidth = 5;
    context.strokeStyle = 'rgba(125, 255, 125, 0.5)';
    context.stroke();
  }
}

function OnPowerEnable() {
  var checkBox = document.getElementById("pwr");
  var disabled = !checkBox.checked;
  document.getElementById("uri").disabled = disabled;
  document.getElementById("login").disabled = disabled;
  document.getElementById("password").disabled = disabled;
  for (var i = 0; i < 7; i++) {
    document.getElementById("sch" + i).disabled = disabled;
    OnSchEnable(i, disabled);
  }

  document.getElementById("px1").disabled = disabled;
  document.getElementById("py1").disabled = disabled;
  document.getElementById("px2").disabled = disabled;
  document.getElementById("py2").disabled = disabled;
}

function OnSchEnable(ind, disabledMain) {
  var checkBox = document.getElementById("sch" + ind);
  var disabled = disabledMain || !checkBox.checked;
  document.getElementById("timeFrom" + ind).disabled = disabled;
  document.getElementById("timeTo" + ind).disabled = disabled;
}

function OnSchCheck(ind) {
  var checkMain = document.getElementById("pwr");
  var disabledMain = !checkMain.checked;
  var checkBox = document.getElementById("sch" + ind);
  var disabled = disabledMain || !checkBox.checked;
  document.getElementById("timeFrom" + ind).disabled = disabled;
  document.getElementById("timeTo" + ind).disabled = disabled;
}

function UpdateLiveFrame()
{
  var delay = 3000;
  setTimeout(SetLiveFrame,delay);
}

function SetLiveFrame()
{
  var img = new Image();
  var id = document.getElementById('iod').selectedIndex;
  img.onload = UpdateLiveFrame();
  document.getElementById('snapshot').src = "snapshot_"+id+".jpg?t="+new Date().getTime();
}

function OnceLiveFrame(id)
{
  var img = new Image();
  document.getElementById('snapshot').src = "snapshot_"+id+".jpg?t="+new Date().getTime();
  document.getElementById('snapInfo').style.display = "";
}

function LiveFrameOnLoad()
{
}

function SetTimepickers()
{
  $('#from').datepicker({
    onSelect: function(date) {
      $(this).attr('value', $('#from').val());
      $("form").submit();
    },
    dateFormat: "yy-mm-dd",
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    firstDay: 1
  });
  $('#to').datepicker({
    onSelect: function(date) {
      $(this).attr('value', $('#to').val());
      $("form").submit();
    },
    dateFormat: "yy-mm-dd",
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    firstDay: 1
  });

  $('#to').change(function() {
    $('#from').datepicker("option", "maxDate", $('#to').datepicker("getDate"));
  });

  $('#from').change(function() {
    $('#to').datepicker("option", "minDate", $('#from').datepicker("getDate"));
  });

  $('#from').datepicker("option", "maxDate", $('#to').datepicker("getDate"));
  $('#to').datepicker("option", "minDate", $('#from').datepicker("getDate"));
}

function SetTimepickersSetupI(ind)
{
  $('#timeFrom' + ind).timepicker({
    timeFormat: "H:i",
    show2400: true,
    minTime: "00:00",
    maxTime: "24:00",
    step: 15
  });
  $('#timeTo' + ind).timepicker({
    timeFormat: "H:i",
    showDuration: true,
    show2400: true,
    minTime: "00:00",
    maxTime: "24:00",
    step: 15
  });

  $('#timeFrom' + ind).change(function() {
    if ($('#timeTo' + ind).timepicker("getTime") < $('#timeFrom' + ind).timepicker("getTime")) {
      $('#timeTo' + ind).timepicker("setTime", $('#timeFrom' + ind).timepicker("getTime"));
    }
    $('#timeTo' + ind).timepicker("option", "minTime", $('#timeFrom' + ind).timepicker("getTime"));
  });

  $('#timeFrom' + ind).trigger('change');
}

function SetTimepickersSetup()
{
  for (var i = 0; i < 7; i++) {
    SetTimepickersSetupI(i);
  }
}

var gCounter = 0;
function AddCompare()
{
  gCounter++;
  if (gCounter >= 4) {
    document.getElementById("vs").style.display = "none";
  }
  var elem = document.getElementById("compare" + gCounter);
  if (elem) {
    elem.style.display = "";
    $("#from"+gCounter).datepicker({
      onSelect: function(date) {
        $("form").submit();
      },
      dateFormat: "yy-mm-dd 00:00",
      monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
      firstDay: 1
    });
  }
}

function RemoveCompare(ind)
{
  var elem = document.getElementById("from" + ind);
  if (elem) {
    elem.value = "";
  }
  var line = document.getElementById("compare" + ind);
  if (line) {
    line.style.display = "none";
  }
  gCounter--;
  if (gCounter < 4) {
    document.getElementById("vs").style.display = "";
  }
}

function OnDocumentReady()
{
  $(document).tooltip();

  var date = new Date;

  var n = date.getTimezoneOffset();
  document.getElementById("utc").value = n;
}
