$(document).ready(function () {
    // animations initialization
    new WOW().init();
});

function GetProject(id) {
    $.get("/project/" + id, {},
        function (data, status) {
            $("#editForm").attr('action', '/project/' + id);
            $("#id").val(data[0].idproject);
            $("#edit_name").val(data[0].name);
            $("#edit_description").val(data[0].description);
        }
    );
    
    // open modal popup
    $("#update_project_modal").modal("show");
}

function DeleteProject(id) {
    var conf = confirm("Você realmente deseja apagar este projeto?");
    if (conf == true) {
        // $.delete("/project/" + id, {},
        //     function (data, status) {
        //         location.reload();
        //     }
        // );
        
        $.ajax({
            url: '/project/' + id,
            type: 'DELETE',
            success: function(data) {
                window.location.href="/projects";
            }
        });
    }
}