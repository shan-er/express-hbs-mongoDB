$(document).ready(function() {
  $('#J-addModal').hide();

  $('#J-addBtn').click(function(e) {
    $('#J-addModal').show();
  });

  $('#J-cancel').click(function(e) {
    $('#J-addModal').hide();
  });

  $('#J-save').click(function(e) {

    var name = $('#J-userName').val().trim();
    var age = $('#J-age').val().trim();
    var dream = $('#J-dream').val().trim();
    var id = +($('#J-id').val());


    if (name && age && dream) {
      $.ajax({
        type: "POST",
        url: '/add',
        data: {
          name: name,
          age: age,
          dream: dream,
          id: +id + 1
        },
        success: function(res) {
          if (res && res.success) {
            $('#J-addModal').hide();
            window.location.reload();
          }
        },
        dataType: 'json'
      });
    } else {
      alert('请输入伙伴姓名、年龄、梦想');
    }
  });

  $('.J-delete-opt').click(function(e){
      var _id = $(e.currentTarget).attr('value');
      if (_id) {
        $.ajax({
          type: "POST",
          url: '/delete',
          data: {
            _id: _id
          },
          success: function(res) {
            if (res && res.success) {
              window.location.reload();
            }
          },
          dataType: 'json'
        });
      } else {
        alert('_id 不能为空');
    }
  });

});