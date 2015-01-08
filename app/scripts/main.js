/* jshint devel:true */

var taskInput = document.getElementById('new-task'), //new-task
	addButton =  document.getElementsByTagName('button')[0], //first button
	incompleteTasksHolder = document.getElementById('incomplete-tasks'), //incompleteTasksHolder
	completedTasksHolder = document.getElementById('completed-tasks'); //completeTasksHolder

var createNewTaskElement = function(taskString) {
	//Create lisItem
	var listItem = document.createElement('li'); 
	//input {checkbox}
	var checkBox = document.createElement('input');
	//label
	var label = document.createElement('label');
	//input {text}
	var editInput = document.createElement('input');
	//button.edit
	var editButton = document.createElement('button');
	//button.delete
	var deleteButton = document.createElement('button');
	
	//Each elements, needs modifing
	checkBox.type = 'checkbox';
	editInput.type = 'text';

	editButton.innerText = 'Edit';
	editButton.className = 'edit';
	deleteButton.innerText = 'Delete';
	deleteButton.className = 'delete';

	label.innerText = taskString;

	//Each elements, needs appending
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;
};

//Add a new task 
var addTask = function(){
	'use strict';
	console.log('Add task...');
	//Create a new list item with text from #new task 
	var listItem = createNewTaskElement(taskInput.value);

	//Append listItem to incompleteTasksHolder
	if(taskInput.value === '') {
		console.log('Empty list');
		taskInput.value = 'What\'s up?';
	} 
	else {
		incompleteTasksHolder.appendChild(listItem);
		bindTaskEvents(listItem, taskCompleted);
		taskInput.value = '';
	}

};

//Edit existing one
var editTask = function(){
	'use strict';
	console.log('Edit task...');
	var listItem = this.parentNode;
	var editInput = listItem.querySelector('input[type="text"]');
	var label = listItem.querySelector('label');
	var editBtn = listItem.getElementsByTagName('button')[0];
	var containsClass = listItem.classList.contains('editMode');
  	//if class of the parent is .editMode
  	if(containsClass){ 
  		//switch from .editMode
  		//label text became the input's value
  		label.innerText = editInput.value;
  		editBtn.innerText = "Edit";
  	}
  	else {
  		//switch to .editMode
  		//input becomes the label's text
  		editInput.value = label.innerText;
  		editBtn.innerText = "Save"; 
  	}
  	
  	//Toggle .editMode on the list item
  	listItem.classList.toggle('editMode');

};

//Delete existing task
var deleteTask = function(){
	'use strict';
	console.log('Delete task...');
  	var listItem = this.parentNode;
  	var ul = listItem.parentNode;
  	//remove the parent list item from the ul
  	ul.removeChild(listItem);
};

//Mark task as complete
var taskCompleted = function(){ 
	'use strict';
	console.log('Task Completed...');
	//Append the task list item to the #completed-task
	var listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);
};

//Mark task as incomplete
var taskIncomplete = function(){ 
	'use strict';
	console.log('Task Incompleted...');
	//Append the task list item to the #incomplete-task 
	var listItem = this.parentNode;
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);
};

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
	console.log('Bind list items events');
	//select taskListItem's children
	var checkBox = taskListItem.querySelector('input[type=checkbox]');
	var	editButton = taskListItem.querySelector('button.edit');
	var	deleteButton = taskListItem.querySelector('button.delete');

	//bind editTask to edit Button 
	editButton.onclick = editTask;

	//bind deleteTask to delete button
	deleteButton.onclick = deleteTask;

	//bind heckBoxEventHandler to checkbox
	checkBox.onchange = checkBoxEventHandler;
};

addButton.addEventListener('click', addTask);

//cycle over the incompleteTasksHolder ul list items
for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
		//bind events to list item's childer (taskCompleted)
		bindTaskEvents(incompleteTasksHolder.children[i],taskCompleted);
}
//cycle over the completeTasksHolder ul list items 
for (var i = 0; i < completedTasksHolder.children.length; i++) {
		//bind events to list item's childer (taskIncompleted)
		bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}


//Set the click handler to addTask fucntion
