// ! ZMIENNE
var smietniki = document.querySelectorAll('.smietnikjs')
var zmianyNazw = document.querySelectorAll(".editName")
var reloads = document.querySelectorAll(".load")
const yesorno = document.getElementById("yesorno")
const inputowanieczegos = document.getElementById("inputowanieczegos") // to jest inna kategoria
const closeBtn = document.getElementById("closeYesOrNo")
const yesBtn = document.getElementById("yes")
const noBtn = document.getElementById("taknaprawdenie")
const listazelementami = document.getElementById("listazelementami")
const titleMaina = document.getElementById("title")
const inputWyskakujacyCONTAINER = document.getElementById("inputowanieczegos")
const inputownia = document.getElementById("inputowniaPL")
const closeBtnInp = document.getElementById("iks")
const changeBtn = document.getElementById("wysylanieZmian")
const addBtn = document.getElementById("newbtn")
var aktualnyElement = ""
var aktualnyElement2 = ""
var iloscRoadmapow = 0
var aktualnyLi = listazelementami.firstElementChild
var currentRoadmapName = "My roadmap" // Aktualna nazwa roadmapy

// ! FUNKCJE
/**
 * 
 * @param {"red" | "green"} color
 */
function sendNotification(tekst, color) {
    let noti = document.getElementById("notification")
    let paragraf = noti.firstElementChild
    paragraf.textContent = tekst
    if (color == "red") {
        paragraf.style.color = "#EF4444"
    } else if (color == "green") {
        paragraf.style.color = "#10B981"
    } else {
        console.log("podaj kolor / zly kolor podany")
    }
    noti.style.opacity = 1
    setTimeout(() => {
        noti.style.opacity = 0
    }, 2000);
}

function przeliczRoadmapy() {
        iloscRoadmapow = listazelementami.querySelectorAll('li').length
        console.log(iloscRoadmapow)
}
function reload(aktualnyLi) {
    var nazwaTekst = aktualnyLi.firstElementChild.textContent
    titleMaina.textContent = nazwaTekst.toUpperCase()
    currentRoadmapName = nazwaTekst
    // Załaduj taski dla aktualnej roadmapy
    if (window.roadmapCreator) {
        window.roadmapCreator.switchRoadmap(currentRoadmapName)
    }
}
function ladujListenery() {
    smietniki.forEach(element => {
        element.addEventListener('click', () => {
            yesorno.style.opacity = "1"
            yesorno.style.pointerEvents = "all"
            aktualnyElement = element.parentElement.parentElement.querySelector("span")
        })
    })
    zmianyNazw.forEach(element => {
        element.addEventListener('click', () => {
            aktualnyElement2 = element.parentElement.parentElement
            inputWyskakujacyCONTAINER.style.opacity = "1"
            inputWyskakujacyCONTAINER.style.pointerEvents = "all"
            let p = inputWyskakujacyCONTAINER.firstElementChild
            p.textContent = "CHANGE ROADMAP NAME"
            changeBtn.textContent = "CHANGE"
        })
    })
    reloads.forEach(element => {
        element.addEventListener("click", () => {
            aktualnyLi = element.parentElement.parentElement            
            reload(aktualnyLi)
        })
    })
}

function dodajElement(tekst, saveToStorage = true) {
    const calyLiInner = `<span class="tekstwli">${tekst}</span><div class="ikonki"><div class="load" style="background-color: #3B82F6;"><img draggable="false" class="smietnikObrazek"src="./assets/load.png" alt="load"></div><div class="editName"><img draggable="false" class="smietnikObrazek"src="./assets/filename.png" alt="edit"></div> <div class="trashcan smietnikjs"><img draggable="false" class="smietnikObrazek" src="./assets/trashcan.png" alt="remove"></div></div>`
    const mojHr = document.createElement("hr")
    const mojLi = document.createElement("li")
    mojHr.classList.add("linia")
    mojLi.innerHTML = calyLiInner
    if(iloscRoadmapow>0) {
        listazelementami.appendChild(mojHr)
    }
    listazelementami.appendChild(mojLi)
    smietniki = document.querySelectorAll('.smietnikjs')
    zmianyNazw = document.querySelectorAll(".editName")
    reloads = document.querySelectorAll('.load')
    
    

        if (saveToStorage) {
            saveListToStorage()
            aktualnyLi = mojLi
            reload(aktualnyLi)
        } else {
            aktualnyLi = listazelementami.firstElementChild
        }
    przeliczRoadmapy()
    ladujListenery()
}
function saveListToStorage() {
    // Pobierz wszystkie nazwy z aktualnie istniejących elementów li
    let liElements = listazelementami.querySelectorAll('li span.tekstwli')
    let nazwy = []
    liElements.forEach(element => {
        nazwy.push(element.textContent.trim())
    })
    localStorage.setItem("listaLi", nazwy.join(", "))
    console.log("Zapisano do localStorage:", nazwy.join(", "))
}
function loadListData() {
    let data = localStorage.getItem("listaLi")
    console.log("Dane z localStorage:", data)
    
    if (data == null || data.trim() === "") {
        console.log("Brak danych - tworzę domyślny element")
        localStorage.setItem("listaLi", "My roadmap")
        dodajElement("My roadmap", false) // false = nie zapisuj do storage
    } else {
        var listaEl = data.split(",")
        console.log("Lista elementów do dodania:", listaEl)
        listaEl.forEach(element => {
            let trimmedElement = element.trim()
            if (trimmedElement !== "") {
                dodajElement(trimmedElement, false) // false = nie zapisuj do storage
            }
        })
    }
}
function submitNameChange() {
    let tresc = inputownia.value
    inputownia.value =''
    inputWyskakujacyCONTAINER.style.opacity = "0"
    inputWyskakujacyCONTAINER.style.pointerEvents = "none"
    return tresc;
}

//! INIT
loadListData()
przeliczRoadmapy()
ladujListenery()
var nazwaPierwszego = aktualnyLi.querySelector("span").textContent
titleMaina.textContent = nazwaPierwszego.toUpperCase()
currentRoadmapName = nazwaPierwszego
if (window.roadmapCreator) {
    window.roadmapCreator.switchRoadmap(currentRoadmapName);
}
// * DODAJ ELEMENT I CHANGE
addBtn.addEventListener('click', () => {
    inputWyskakujacyCONTAINER.style.opacity = "1"
    inputWyskakujacyCONTAINER.style.pointerEvents = "all"
    let p = inputWyskakujacyCONTAINER.firstElementChild
    p.textContent = "ENTER ROADMAP NAME"
    changeBtn.textContent = "ADD"
})
changeBtn.addEventListener('click', () => {
    if (changeBtn.textContent == "CHANGE"){
        let tresc = submitNameChange()
        const onlyWhitespace = tresc.trim() === ''
        if(onlyWhitespace) {
            sendNotification("text can't be empty.", "red")
            inputWyskakujacyCONTAINER.style.opacity = "1"
            inputWyskakujacyCONTAINER.style.pointerEvents = "all"
        } else {
            // Zapisz starą nazwę do zmiany w storage tasków
            let oldName = aktualnyElement2.querySelector("span").textContent
            aktualnyElement2.querySelector("span").textContent = tresc
            sendNotification("title changed successfully.", "green")
            titleMaina.textContent = tresc.toUpperCase()
            
            if (window.roadmapCreator) {
                // Zawsze przenieś dane pod nową nazwę w localStorage (tasks -> roadmapy)
                window.roadmapCreator.renameRoadmap(oldName, tresc);
                // Jeśli właśnie zmieniana była aktywna roadmapa, zaktualizuj currentRoadmapName
                if (currentRoadmapName === oldName) {
                    currentRoadmapName = tresc;
                }
            }
            
            saveListToStorage()
        }
    } else if (changeBtn.textContent == "ADD") {
        let tresc = submitNameChange()
        const onlyWhitespace = tresc.trim() === ''
        if(onlyWhitespace) {
            sendNotification("text can't be empty.", "red")
            inputWyskakujacyCONTAINER.style.opacity = "1"
            inputWyskakujacyCONTAINER.style.pointerEvents = "all"
        } else {
            dodajElement(tresc, true)
            sendNotification("roadmap added successfully.", "green")
        }
    } else {
        console.log("co tu sie odpierdala")
    }
})
inputownia.addEventListener("keypress", (event) => {
    if (event.key === 'Enter') {
        if (changeBtn.textContent == "CHANGE"){
            let tresc = submitNameChange()
            const onlyWhitespace = tresc.trim() === ''
            if(onlyWhitespace) {
                sendNotification("text can't be empty.", "red")
                inputWyskakujacyCONTAINER.style.opacity = "1"
                inputWyskakujacyCONTAINER.style.pointerEvents = "all"
            } else {
                let oldName = aktualnyElement2.querySelector("span").textContent
                aktualnyElement2.querySelector("span").textContent = tresc
                sendNotification("title changed successfully.", "green")
                titleMaina.textContent = tresc.toUpperCase()
                
                if (window.roadmapCreator) {
                    // Zawsze przenieś dane pod nową nazwę w localStorage (tasks -> roadmapy)
                    window.roadmapCreator.renameRoadmap(oldName, tresc);
                    // Jeśli właśnie zmieniana była aktywna roadmapa, zaktualizuj currentRoadmapName
                    if (currentRoadmapName === oldName) {
                        currentRoadmapName = tresc;
                    }
                }
                
                saveListToStorage()
            }
        } else if (changeBtn.textContent == "ADD") {
            let tresc = submitNameChange()
            const onlyWhitespace = tresc.trim() === ''
            if(onlyWhitespace) {
                sendNotification("text can't be empty.", "red")
                inputWyskakujacyCONTAINER.style.opacity = "1"
                inputWyskakujacyCONTAINER.style.pointerEvents = "all"
            } else {
                dodajElement(tresc, true)
                sendNotification("roadmap added successfully.", "green")
            }
        } else {
            console.log("co tu sie odpierdala")
        }
    }
})
closeBtnInp.addEventListener('click', () => {
    inputWyskakujacyCONTAINER.style.opacity = "0"
    inputWyskakujacyCONTAINER.style.pointerEvents = "none"
})

// * TRASHCANY
closeBtn.addEventListener('click', () => {
    yesorno.style.opacity = "0"
    yesorno.style.pointerEvents = "none"
})
yesBtn.addEventListener('click', () => {
    if (iloscRoadmapow > 1) {
        let li = aktualnyElement.parentElement
        let hr = li.nextElementSibling
        let roadmapToDelete = aktualnyElement.textContent
        
        if (hr && hr.tagName.toLowerCase() === "hr") {
            hr.remove();
        }
        li.remove()
        
        // Usuń dane roadmapy z storage
        if (window.roadmapCreator) {
            window.roadmapCreator.deleteRoadmap(roadmapToDelete)
        }
        
        if (aktualnyLi == li) {
            aktualnyLi = listazelementami.firstElementChild
            reload(aktualnyLi)
            console.log("nastapilo usuwanie li w ktorym sie znajduje, zmieniam current li")
        }
        yesorno.style.opacity = "0"
        yesorno.style.pointerEvents = "none"
        sendNotification(`${roadmapToDelete} got removed!`, "red")
        przeliczRoadmapy()
        saveListToStorage()
    } else {
        sendNotification("you must have at least 1 roadmap.", "red")
    }
})
noBtn.addEventListener('click', () => {
    yesorno.style.opacity = "0"
    yesorno.style.pointerEvents = "none"
})
const plus = document.getElementById("plus")
const minus = document.getElementById("minus")
const main = document.getElementById('main');
const origHeight = main.offsetHeight;
plus.addEventListener('click', () => {
    main.style.height = main.offsetHeight + origHeight + 'px';
});
minus.addEventListener('click', () => {
    const newHeight = main.offsetHeight - origHeight;
    if (newHeight >= origHeight) {
    main.style.height = newHeight + 'px';
    }
});
// ! DZIEN DOBRY
// Roadmap Creator - Drag and Connect functionality
class RoadmapCreator {
    constructor() {
        this.roadmaps = {}; // Przechowuje dane dla każdej roadmapy
        this.currentRoadmap = "My roadmap";
        this.tasks = [];
        this.connections = [];
        this.isConnecting = false;
        this.selectedTask = null;
        this.taskCounter = 0;
        this.isRemoving = false;
        
        this.init();
    }

    init() {
        this.createCanvas();
        this.bindEvents();
        this.loadAllRoadmapsFromStorage();
        this.switchRoadmap(this.currentRoadmap);
        this.updateCanvas();
    }

    createCanvas() {
        // Sprawdź czy canvas już istnieje
        if (document.getElementById('taskCanvas')) {
            return;
        }
        
        const canvas = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        canvas.id = 'taskCanvas';
        canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        
        const main = document.querySelector('main');
        main.appendChild(canvas);
        
        this.canvas = canvas;
        this.resizeCanvas();
    }

    bindEvents() {
        // ADD TASK button
        const addBtn = document.querySelector('.send');
        const addInput = document.querySelector('.inpucix');
        
        if (addBtn && addInput) {
            addBtn.addEventListener('click', () => this.addTask(addInput.value.trim()));
            addInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.addTask(addInput.value.trim());
                }
            });
        }

        // CONNECT TASKS button
        const connectBtn = document.getElementById("conn");
        if (connectBtn) {
            connectBtn.addEventListener('click', () => this.toggleConnectMode());
        }

        // REMOVE TASK button
        const removeBtn = document.getElementById("rem")
        if (removeBtn) {
            removeBtn.addEventListener('click', () => this.toggleRemoveMode());
        }

        // Window events
        window.addEventListener('resize', () => this.updateCanvas());
        window.addEventListener('scroll', () => this.updateConnections());
        
        // Hide notification on click
        const notification = document.getElementById('notification');
        if (notification) {
            notification.addEventListener('click', () => this.hideNotification());
        }
    }

    // Funkcja do ograniczania pozycji do granic main
    constrainToMain(x, y, taskWidth = 150, taskHeight = 80) {
        const main = document.querySelector('main');
        const mainRect = main.getBoundingClientRect();
        const mainStyle = window.getComputedStyle(main);
        const paddingLeft = parseInt(mainStyle.paddingLeft);
        const paddingRight = parseInt(mainStyle.paddingRight);
        const paddingTop = parseInt(mainStyle.paddingTop);
        const paddingBottom = parseInt(mainStyle.paddingBottom);
        
        const minX = paddingLeft;
        const minY = paddingTop;
        const maxX = mainRect.width - paddingRight - taskWidth;
        const maxY = mainRect.height - paddingBottom - taskHeight;
        
        return {
            x: Math.max(minX, Math.min(maxX, x)),
            y: Math.max(minY, Math.min(maxY, y))
        };
    }

    addTask(taskName) {
        if (!taskName) {
            this.showNotification('Enter task name first!');
            return;
        }

        const task = this.createTaskElement(taskName);
        this.tasks.push(task);
        this.saveCurrentRoadmapToStorage();
        this.updateProgress();
        
        // Clear input
        const input = document.querySelector('.inpucix');
        if (input) input.value = '';

        this.showNotification(`Task "${taskName}" added!`);
    }

    createTaskElement(taskName) {
        const main = document.querySelector('main');
        const task = document.createElement('div');
        task.className = 'task-node';
        task.id = `task-${++this.taskCounter}`;
        
        // Random position within main area with constraints
        const mainRect = main.getBoundingClientRect();
        const randomX = Math.random() * (mainRect.width - 200) + 50;
        const randomY = Math.random() * (mainRect.height - 100) + 100;
        const constrainedPos = this.constrainToMain(randomX, randomY);
        
        task.style.cssText = `
            position: absolute;
            left: ${constrainedPos.x}px;
            top: ${constrainedPos.y}px;
            width: 150px;
            padding: 1rem;
            background: var(--szary);
            border-radius: 0.75rem;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            cursor: grab;
            user-select: none;
            transition: box-shadow 0.3s ease, transform 0.3s ease;
            z-index: 1;
            border: 2px solid transparent;
        `;

        const taskContent = document.createElement('p');
        taskContent.textContent = taskName;
        taskContent.style.cssText = `
            margin: 0;
            font-size: 0.9rem;
            color: #4b5563;
            text-align: center;
            font-weight: 600;
            word-wrap: break-word;
        `;

        const statusIndicator = document.createElement('div');
        statusIndicator.className = 'task-status';
        statusIndicator.style.cssText = `
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: var(--czerwony);
            position: absolute;
            top: 8px;
            right: 8px;
            transition: background 0.3s ease;
        `;

        task.appendChild(taskContent);
        task.appendChild(statusIndicator);
        main.appendChild(task);

        this.bindTaskEvents(task);
        
        return {
            element: task,
            id: task.id,
            name: taskName,
            completed: false,
            x: constrainedPos.x,
            y: constrainedPos.y
        };
    }

    bindTaskEvents(taskElement) {
        let isDragging = false;
        let offsetX, offsetY;

        // Mouse down - start dragging
        taskElement.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return; // Only left click
            
            if (this.isConnecting) {
                this.handleConnectionClick(taskElement);
                return;
            }
            
            if (this.isRemoving) {
                this.removeTask(taskElement);
                return;
            }

            isDragging = true;
            offsetX = e.clientX - taskElement.offsetLeft;
            offsetY = e.clientY - taskElement.offsetTop;
            
            taskElement.style.cursor = 'grabbing';
            taskElement.style.transform = 'scale(1.05)';
            taskElement.style.zIndex = '10';

            const mouseMoveHandler = (e) => {
                if (!isDragging) return;
                
                const newX = e.clientX - offsetX;
                const newY = e.clientY - offsetY;
                
                // Ogranicz pozycję do granic main
                const constrainedPos = this.constrainToMain(newX, newY);
                
                taskElement.style.left = constrainedPos.x + 'px';
                taskElement.style.top = constrainedPos.y + 'px';
                
                this.updateTaskPosition(taskElement.id, constrainedPos.x, constrainedPos.y);
                this.updateConnections();
            };

            const mouseUpHandler = () => {
                isDragging = false;
                taskElement.style.cursor = 'grab';
                taskElement.style.transform = 'scale(1)';
                taskElement.style.zIndex = '1';
                
                document.removeEventListener('mousemove', mouseMoveHandler);
                document.removeEventListener('mouseup', mouseUpHandler);
                
                this.saveCurrentRoadmapToStorage();
            };

            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        });

        // Right click - toggle completion
        taskElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.toggleTaskCompletion(taskElement);
        });
    }

    toggleTaskCompletion(taskElement) {
        const task = this.tasks.find(t => t.id === taskElement.id);
        if (!task) return;

        task.completed = !task.completed;
        const statusIndicator = taskElement.querySelector('.task-status');
        if (task.completed) {
            statusIndicator.style.backgroundColor = 'var(--zielony)';
            taskElement.style.filter = 'brightness(1.3)';
        } else {
            statusIndicator.style.backgroundColor = 'var(--czerwony)';
            taskElement.style.filter = 'brightness(1)';
        }

        this.updateProgress();
        this.saveCurrentRoadmapToStorage();
    }

    toggleConnectMode() {
        this.isConnecting = !this.isConnecting;
        this.isRemoving = false;
        
        const connectBtn = document.getElementById("conn");
        const main = document.querySelector('main');
        
        if (this.isConnecting) {
            connectBtn.style.backgroundColor = '#059669';
            connectBtn.textContent = 'CONNECTING...';
            main.style.cursor = 'crosshair';
            this.showNotification('Click two tasks to connect them');
        } else {
            connectBtn.style.backgroundColor = '#10B981';
            connectBtn.textContent = 'CONNECT TASKS';
            main.style.cursor = 'default';
            this.selectedTask = null;
            this.clearTaskSelection();
            this.hideNotification();
        }
    }

    toggleRemoveMode() {
        this.isRemoving = !this.isRemoving;
        this.isConnecting = false;
        
        const removeBtn = document.getElementById("rem");
        const connectBtn = document.getElementById("conn");
        const main = document.querySelector('main');
        
        if (this.isRemoving) {
            removeBtn.style.backgroundColor = '#991b1b';
            removeBtn.textContent = 'REMOVING...';
            main.style.cursor = 'not-allowed';
            connectBtn.style.backgroundColor = '#10B981';
            connectBtn.textContent = 'CONNECT TASKS';
            this.showNotification('Click task to remove it');
        } else {
            removeBtn.style.backgroundColor = '#EF4444';
            removeBtn.textContent = 'REMOVE TASK';
            main.style.cursor = 'default';
            this.hideNotification();
        }
    }

    handleConnectionClick(taskElement) {
        if (!this.selectedTask) {
            this.selectedTask = taskElement;
            taskElement.style.border = '2px solid var(--niebieski)';
            this.showNotification('Select second task to connect');
        } else if (this.selectedTask === taskElement) {
            // Deselect same task
            taskElement.style.border = '2px solid transparent';
            this.selectedTask = null;
            this.showNotification('Click two tasks to connect them');
        } else {
            // Connect tasks
            this.connectTasks(this.selectedTask, taskElement);
            this.clearTaskSelection();
            this.toggleConnectMode();
        }
    }

    connectTasks(task1, task2) {
        const connection = {
            id: `conn-${Date.now()}`,
            from: task1.id,
            to: task2.id
        };

        // Check if connection already exists
        const exists = this.connections.some(conn => 
            (conn.from === task1.id && conn.to === task2.id) ||
            (conn.from === task2.id && conn.to === task1.id)
        );

        if (!exists) {
            this.connections.push(connection);
            this.createConnectionLine(connection);
            this.saveCurrentRoadmapToStorage();
            this.showNotification('Tasks connected!');
        } else {
            this.showNotification('Tasks already connected!');
        }
    }

    createConnectionLine(connection) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.id = connection.id;
        line.setAttribute('stroke', 'var(--niebieski)');
        line.setAttribute('stroke-width', '3');
        line.setAttribute('stroke-dasharray', '5,5');
        line.style.filter = 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))';
        
        this.canvas.appendChild(line);
        this.updateConnectionLine(connection);
    }

    updateConnectionLine(connection) {
        const fromTask = document.getElementById(connection.from);
        const toTask = document.getElementById(connection.to);
        const line = document.getElementById(connection.id);
        
        if (!fromTask || !toTask || !line) return;

        const fromRect = fromTask.getBoundingClientRect();
        const toRect = toTask.getBoundingClientRect();
        const mainRect = document.querySelector('main').getBoundingClientRect();
        
        const x1 = fromRect.left - mainRect.left + fromRect.width / 2;
        const y1 = fromRect.top - mainRect.top + fromRect.height / 2;
        const x2 = toRect.left - mainRect.left + toRect.width / 2;
        const y2 = toRect.top - mainRect.top + toRect.height / 2;
        
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
    }

    removeTask(taskElement) {
        const taskId = taskElement.id;
        
        // Remove from tasks array
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        
        // Remove connections
        const connectionsToRemove = this.connections.filter(conn => 
            conn.from === taskId || conn.to === taskId
        );
        
        connectionsToRemove.forEach(conn => {
            const line = document.getElementById(conn.id);
            if (line) line.remove();
        });
        
        this.connections = this.connections.filter(conn => 
            conn.from !== taskId && conn.to !== taskId
        );
        
        // Remove element
        taskElement.remove();
        
        this.updateProgress();
        this.saveCurrentRoadmapToStorage();
        this.showNotification('Task removed!');
    }

    clearTaskSelection() {
        if (this.selectedTask) {
            this.selectedTask.style.border = '2px solid transparent';
            this.selectedTask = null;
        }
    }

    updateTaskPosition(taskId, x, y) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.x = x;
            task.y = y;
        }
    }

    updateConnections() {
        this.connections.forEach(connection => {
            this.updateConnectionLine(connection);
        });
    }

    updateCanvas() {
        this.resizeCanvas();
        this.updateConnections();
    }

    resizeCanvas() {
        if (!this.canvas) return;
        
        const main = document.querySelector('main');
        const rect = main.getBoundingClientRect();
        
        this.canvas.setAttribute('width', rect.width);
        this.canvas.setAttribute('height', rect.height);
    }

    updateProgress() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        
        const info = document.querySelector('#info p');
        const progressBar = document.getElementById('progressbar');
        
        if (info) {
            info.textContent = `${completed} / ${total} completed`;
        }
        if (progressBar) {
            const percentage = total > 0 ? (completed / total) * 100 : 0;
            progressBar.style.width = `${percentage}%`;
        }
    }

    showNotification(message) {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.querySelector('p').textContent = message;
            notification.style.opacity = '1';
            notification.style.pointerEvents = 'auto';
            notification.querySelector('p').style.color = '#10B981';
            // Auto hide after 3 seconds
            setTimeout(() => this.hideNotification(), 3000);
        }
    }

    hideNotification() {
        const notification = document.getElementById('notification');
        if (notification) {
            notification.style.opacity = '0';
            notification.style.pointerEvents = 'none';
        }
    }

    saveCurrentRoadmapToStorage() {
        this.roadmaps[this.currentRoadmap] = {
            tasks: this.tasks.map(task => ({
                id: task.id,
                name: task.name,
                completed: task.completed,
                x: task.x,
                y: task.y
            })),
            connections: this.connections,
            counter: this.taskCounter
        }
        localStorage.setItem("roadmaps", JSON.stringify(this.roadmaps))
        console.log("Zapisano do LS:", JSON.stringify(this.roadmaps))
    }

    loadAllRoadmapsFromStorage() {
        const data = localStorage.getItem("roadmaps")
        if (data) {
            this.roadmaps = JSON.parse(data)
        }
        if (!this.roadmaps[this.currentRoadmap]) {
            this.roadmaps[this.currentRoadmap] = { tasks: [], connections: [], counter: 0 }
        }
    }

    switchRoadmap(name) {
        if (!this.roadmaps[name]) {
            this.roadmaps[name] = { tasks: [], connections: [], counter: 0 }
        }
        this.currentRoadmap = name
        this.tasks = []
        this.connections = []
        this.taskCounter = 0

        document.querySelectorAll('.task-node').forEach(el => el.remove())
        this.canvas.innerHTML = ''

        if (this.roadmaps[name]) {
            const { tasks, connections, counter } = this.roadmaps[name]
            this.taskCounter = counter || 0

            tasks.forEach(task => {
                const el = this.createTaskElement(task.name)
                el.element.style.left = task.x + 'px'
                el.element.style.top = task.y + 'px'
                el.x = task.x
                el.y = task.y
                el.id = task.id
                el.element.id = task.id
                el.completed = task.completed
                this.tasks.push(el)
                if (task.completed) {
                    el.completed = true
                    const status = el.element.querySelector('.task-status')
                    status.style.backgroundColor = 'var(--zielony)'
                    el.element.style.filter = 'brightness(1.3)'
                }
            })

            this.connections = connections || []
            this.connections.forEach(conn => this.createConnectionLine(conn))
        }

        this.updateProgress()
        this.updateCanvas()
    }

    renameRoadmap(oldName, newName) {
        if (this.roadmaps[oldName]) {
            this.roadmaps[newName] = this.roadmaps[oldName]
            delete this.roadmaps[oldName]
            if (this.currentRoadmap === oldName) {
                this.currentRoadmap = newName
            }
            localStorage.setItem("roadmaps", JSON.stringify(this.roadmaps))
        }
    }

    deleteRoadmap(name) {
        delete this.roadmaps[name]
        localStorage.setItem("roadmaps", JSON.stringify(this.roadmaps))
    }
}
document.addEventListener('DOMContentLoaded', () => {
    window.roadmapCreator = new RoadmapCreator();
    window.roadmapCreator.switchRoadmap(currentRoadmapName);
});