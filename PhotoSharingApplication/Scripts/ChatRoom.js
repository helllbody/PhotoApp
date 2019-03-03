

$(function () {
    // Declare a proxy to reference the hub. 
    var chat = $.connection.chatHub;
    // Create a function that the hub can call to broadcast messages.
    chat.client.addMessage = function (name, message) {
        // Html encode display name and message. 
        var encodedName = $('<div />').text(name).html();
        var encodedMsg = $('<div />').text(message).html();
        // Add the message to the page. 
        $('#discussion').append('<li><strong>' + encodedName
            + '</strong>:&nbsp;&nbsp;' + encodedMsg + '</li>');
    };

    // Set initial focus to message input box.  
    $('#chat-message').focus();
    // Start the connection.
    $.connection.hub.start().done(function () {
        chat.server.join(photoid).done(function () {
            $('#sendmessage').click(function () {
                // Call the Send method on the hub. 
                chat.server.send(username, photoid, $('#chat-message').val());
                // Clear text box and reset focus for next comment. 
                $('#chat-message').val('').focus();
            });
        });
    });
});

