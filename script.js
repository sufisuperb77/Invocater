document.querySelectorAll('input[name="mealTime"]').forEach(item => {
  item.addEventListener('change', event => {
      const mealTimeDiv = event.target.parentNode;
      if (event.target.checked) {
          mealTimeDiv.querySelector('.qty-inputs').style.display = "block";
      } else {
          mealTimeDiv.querySelector('.qty-inputs').style.display = "none";
      }
  });
});