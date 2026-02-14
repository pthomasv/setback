from collections import deque
from random import randint

cards = [
    [14, "♠️"], [13, "♠️"], [12, "♠️"], [11, "♠️"], [10, "♠️"], [9, "♠️"], [8, "♠️"], [7, "♠️"], [6, "♠️"], [5, "♠️"], [4, "♠️"], [3, "♠️"], [2, "♠️"],
    
    [14, "♣️"], [13, "♣️"], [12, "♣️"], [11, "♣️"], [10, "♣️"], [9, "♣️"], [8, "♣️"], [7, "♣️"], [6, "♣️"], [5, "♣️"], [4, "♣️"], [3, "♣️"], [2, "♣️"],
    
    [2, "♥️"], [3, "♥️"], [4, "♥️"], [5, "♥️"], [6, "♥️"], [7, "♥️"], [8, "♥️"], [9, "♥️"], [10, "♥️"], [11, "♥️"], [12, "♥️"], [13, "♥️"], [14, "♥️"],
    
    [2, "♦️"], [3, "♦️"], [4, "♦️"], [5, "♦️"], [6, "♦️"], [7, "♦️"], [8, "♦️"], [9, "♦️"], [10, "♦️"], [11, "♦️"], [12, "♦️"], [13, "♦️"], [14, "♦️"]
]

dealer = 0

def randomize (arr, n):
    for i in range(n-1,0,-1):
        j = randint(0,i+1)
        arr[i],arr[j] = arr[j],arr[i]
    return arr

deck = deque()
player1 = deque()
player2 = deque()

for i in range(52):
    deck.append(cards[i])

randomize(deck,len(deck))

def deal():
    for card in [3,3,1]:
        for _ in range(card):
            player1.append(deck.popleft())
        for _ in range(card):
            player2.append(deck.popleft())

deal()
print("p1", player1)
print("p2", player2)


p1_winnings = []
p2_winnings = []
p1bid = 0
p2bid = 0
bidwinner = ""
gamewinner = ""
suit = ""

def chooseSuit(bidwinner):
    global suit
    while True:
        suit = input(f'{bidwinner}, choose a suit: clubs ♣️ (c), hearts ♦️ (h), spades ♠️ (s), diamonds ♥️ (d): ')
        if suit in ("d", "c", "s", "h"):
            match suit:
                case "h":
                    return "♥️"
                case "d":
                    return "♦️"
                case "s":
                    return "♠️"
                case "c":
                    return "♣️"
                

def winner(winner, winningBid):
    print(winner,"wins with a bid of" ,winningBid)


def player1TurnToBid():
    global p1bid
    global bidwinner
    while True:
        if p2bid:
            print(f'Player2 bid : {p2bid}')
        p1bid = input("Player1. What is your bid? 2, 3, 4, pass: ")
            
        if p1bid in ("4", "2", "3", "pass"):
            if p1bid == "pass":
                p1bid = "0"
                if p2bid == 0: #player2 hasn't bid yet
                    break
                return "Player2"
            elif p1bid == "4":
                return "Player1"
            elif int(p1bid) > int(p2bid):
                break
            else:
                print("Must bid higher or pass")

        else:
            print("Invalid input. Bid again")


def player2TurnToBid():
    global p2bid
    global bidwinner
    while True:
        if p1bid:
            print(f'Player1 bid: {("pass (you must bid atleast 2)" if p1bid == "0" else p1bid) }')
        p2bid = input("Player2. What is your bid? 2, 3, 4, pass: ")

        if p2bid in ("2", "3", "4", "pass"):
            if p2bid == "pass":
                p2bid = "0"
                if p1bid != "0":
                    return "Player1"
            elif p2bid == "4":
                return "Player2"
            elif int(p2bid) > int(p1bid):
                if p1bid=="0":
                    return "Player2"
                else: 
                    break
            else:
                print("Must bid higher or pass")
        else:
            print("Invalid input. Bid again")


while not bidwinner or bidwinner == "":
    bidwinner = player1TurnToBid()
    if bidwinner:
        break

    bidwinner = player2TurnToBid()
    if bidwinner:
        break


winningBid = max(int(p1bid), int(p2bid))
winner(bidwinner, winningBid)

trump = chooseSuit(bidwinner)

while len(player1) != 0:
    # add error catching here
    p1_card = int(input(f"What card do you want to play? {player1}")) - 1
    p2_card = int(input(f"What card do you want to play? {player2}")) - 1

    def compare(p1_card, p2_card):
        mini_trump = ""

        if player1[p1_card][1] == trump and player2[p2_card][1] == trump:
            print("Arielle")
            return max(player1[p1_card][0], player2[p2_card][0])
        elif player1[p1_card][1] == trump:
            print("Flor")
            return "player1"
        elif player2[p2_card][1] == trump:
            print("Peter")
            return "player2"
        else:
            mini_trump = player1[p1_card][1]
            if player2[p2_card][1] == mini_trump:
                print("Mikey")
                return "player1" if player1[p1_card][0] > player2[p2_card][0] else "player2"
            else:
                print("Deborah")
                return "player1"


    if compare(p1_card, p2_card) == "player1":
        p1_winnings.extend([player1[p1_card], player2[p2_card]])
    else:
        p2_winnings.extend([player1[p1_card], player2[p2_card]])

    player1.remove(player1[p1_card])
    player2.remove(player2[p2_card])

    print(f'p1_winnings {p1_winnings}')
    print(f'p2_winnings {p2_winnings}')


p1_bet = 0
p2_bet = 0

def calc_game_points(deck):
    total_points = 0
    for card in deck:
        points = 0
        if card[0] >= 10:
            match card[0]:
                case 10:
                    points = 10
                case 11:
                    points = 1
                case 12:
                    points = 2
                case 13:
                    points = 3
                case 14:
                    points = 4  
        total_points += points
    return total_points

p1_game = calc_game_points(p1_winnings)
p2_game = calc_game_points(p2_winnings)

game_cards = p1_winnings + p2_winnings

p1_jack = False
p2_jack = False

jack = [11, trump]
if jack in p1_winnings:
    p1_jack = True
elif jack in p2_winnings:
    p2_jack = True


def high_card(letter):
    global game_cards
    high = [0,letter]
    for card in game_cards:
        if card[1] == letter and card[0] > high[0]:
            high = card
    return high
    
def low_card(letter):
    global game_cards
    low = [15,letter]
    for card in game_cards:
        if card[1] == letter and card[0] < low[0]:
            low = card
    return low

high = high_card(trump)
low = low_card(trump)

print("STATS")
print("-----------------")
print("GAME")
print(f"player1: {p1_game}")
print(f"player2: {p2_game}")
print(f"{'player1' if p1_game > p2_game else 'player2'} +1 point")
print("-----------------")
print("JACK")
print(f"player1: {'Has Jack +1 point' if p1_jack else 'Doesn’t Have Jack'}")
print(f"player2: {'Has Jack +1 point' if p2_jack else 'Doesn’t Have Jack'}")
print("-----------------")
print("HIGH")
print(high)
print(f"player1: {'Has High +1 point' if high in p1_winnings else ''}")
print(f"player2: {'Has High +1 point' if high in p2_winnings else ''}")
print("-----------------")
print("LOW")
print(low)
print(f"player1: {'Has Low +1 point' if low in p1_winnings else ''}")
print(f"player2: {'Has Low +1 point' if low in p2_winnings else ''}")
print("-----------------")


