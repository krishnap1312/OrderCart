# Restaurant Ordering System

## Overview
This project is a restaurant ordering system designed to streamline the process of managing and placing orders. The system is divided into two main parts: the owner's interface and the end user's interface. Owners can manage menu items, and end users can place orders conveniently.


## Video Demo
[![Complete video]()](https://drive.google.com/file/d/1TDAV4uNx8k2zP9K9GLnmz2c1H6aDsDEz/view?usp=sharing)


## Features

### Owner's Interface
- **Add Menu Items**: Owners can add new menu items to the database, including details like name, description, price, and image.
- **Database Storage**: All menu items are stored in a database, ensuring persistence and easy retrieval.

### End User's Interface
- **View Menu Items**: The front end fetches menu items from the database and displays them for the end user.
- **Add Items to Cart**: Users can add items to their cart from the menu.
- **Modify Cart**: Users can increment or decrease the quantity of items in their cart or remove items entirely.
- **Dynamic Total Price**: The total price of items in the cart is dynamically updated based on the number of items and their quantities.
- **QR Code Payment**: Users can view a QR code to make payments using any UPI ID. 
- **Confirm Payment**: After making the payment, users must click on the "Confirm Payment" button. Note that the payment gateway is a dummy, but if you scan a QR Code using any UPI app it will show the receiver's name and even you can transfer the amount too. The actual payment processing is not implemented means if payment is done then this restaurant won't automatically redirect you to the Home Page you have to click on the *Confirm Payment* button.
- **Empty Cart**: Once payment is confirmed, the cart is emptied, and the ordered products are stored in the database.

## Installation and Setup
1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/restaurant-ordering-system.git
    cd restaurant-ordering-system
    ```

2. **Backend Setup**:
    - Navigate to the backend directory.
    - Install dependencies:
        ```bash
        npm install
        ```
    - Set up the `.env` file with your database credentials.
    - Start the backend server:
        ```bash
        npm start
        ```

3. **Frontend Setup**:
    - Navigate to the frontend directory.
    - Install dependencies:
        ```bash
        npm install
        ```
    - Start the frontend development server:
        ```bash
        npm start
        ```

## Usage
- **Owner's Interface**: 
    - Access the admin panel to add, edit, or remove menu items.
- **End User's Interface**: 
    - Browse the menu, add items to the cart, and proceed to checkout.
    - View the QR code for payment and confirm the payment to place the order.

## Future Enhancements
- Integration with a real payment gateway.
- Enhanced user authentication for both owners and customers.
- Additional features for managing orders and tracking delivery status.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.

