Module.register("MMM-SystemOptions", {
    defaults: {},

    // Define styles
    getStyles: function() {
        return ["MMM-SystemOptions.css"];
    },

    // Override dom generator.
    getDom: function() {
        const wrapper = document.createElement("div");
        wrapper.className = "menu-wrapper";

        // Hamburger icon
        const hamburger = document.createElement("div");
        hamburger.className = "hamburger";
        hamburger.innerHTML = "&#9776;"; 
        wrapper.appendChild(hamburger);

        // Options menu
        const menu = document.createElement("div");
        menu.className = "menu";
        wrapper.appendChild(menu);

        // Button creation function
        const createButton = (text, iconClass, action) => {
            const btn = document.createElement("button");
            btn.innerHTML = `<i class="fa ${iconClass}" aria-hidden="true"></i> ${text}`;
            btn.addEventListener("click", () => {
                this.sendNotification('REMOTE_ACTION', {action: action});
                menu.style.display = "none"; // Close the menu after action
            });
            menu.appendChild(btn);
        };
        
        createButton("Refresh Screen", "fa-sync", "REFRESH");
        createButton("Minimize Window", "fa-window-minimize", "MINIMIZE");
        createButton("Restart Dashboard", "fa-redo", "RESTART");
        createButton("Reboot System", "fa-power-off", "REBOOT");
        createButton("Shutdown System", "fa-power-off", "SHUTDOWN");
        

        // Hamburger click event to show/hide menu
        hamburger.addEventListener("click", () => {
            menu.style.display = menu.style.display === "none" ? "block" : "none";
        });

        // Click anywhere outside the menu to close it
        document.addEventListener("click", (event) => {
            if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
                menu.style.display = "none";
            }
        });

        return wrapper;
    },

    // Override the start method
    start: function() {
        Log.info("Starting module: " + this.name);
    },

    // Define notification handler
    notificationReceived: function(notification, payload, sender) {
        // Handle notifications if necessary
    }
});
