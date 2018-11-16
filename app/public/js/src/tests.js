$(document).ready(function () {
    // animations initialization
    new WOW().init();
});

function GetTest(id) {
    $.get("ajax/tests/get-test.php", {
            test: id
        },
        function (data, status) {
            var test = JSON.parse(data); // decodeURIComponent(JSON.parse(data));
            $("#id").val(test.idtest);
            $("#edit_description").val(test.description);
        }
    );
    
    // open modal popup
    $("#update_test_modal").modal("show");
}

function DeleteTest(id) {
    var conf = confirm("Você realmente deseja apagar este caso de teste?");
    if (conf == true) {
        $.post("ajax/tests/delete-test.php", {
                test: id
            },
            function (data, status) {
                location.reload();
            }
        );
    }
}

function FetchStories(id)
{
    $.ajax({
        type: 'get',
        url: 'ajax/stories/get-stories-options.php',
        data: {
            project: id
        },
        success: function (response) {
           // var content = decodeURIComponent(escape(response));
           $("#select_story").html(response); 
        }
    });
}